const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/disaster_intelligence")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.get("/events", async (req, res) => {
  try {
    const events = await mongoose.connection.db
      .collection("events")
      .find({})
      .toArray();

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.get("/posts/:event", async (req, res) => {
  try {
    const eventName = req.params.event;

    const eventDoc = await mongoose.connection.db
      .collection("events")
      .findOne({ event_name: eventName });

    const posts = await mongoose.connection.db
      .collection("posts")
      .find({ event_name: eventName })
      .limit(20)
      .toArray();

    const annotations = await mongoose.connection.db
      .collection("annotations")
      .find({ event_name: eventName })
      .toArray();

    const annotationMap = new Map();
    for (const ann of annotations) {
      annotationMap.set(String(ann.tweet_id), ann);
    }

    const enrichedPosts = posts.map((post) => {
      const ann = annotationMap.get(String(post.id)) || {};

      const derivedLocation =
        post?.place?.full_name ||
        post?.user?.location ||
        eventDoc?.country ||
        "Event region available";

      const derivedLabel =
        ann?.image_damage && ann.image_damage !== "nan"
          ? ann.image_damage
          : ann?.text_human &&
            ann.text_human !== "not_humanitarian" &&
            ann.text_human !== "nan"
          ? ann.text_human
          : ann?.image_human &&
            ann.image_human !== "not_humanitarian" &&
            ann.image_human !== "nan"
          ? ann.image_human
          : ann?.text_info && ann.text_info !== "nan"
          ? ann.text_info
          : ann?.image_info && ann.image_info !== "nan"
          ? ann.image_info
          : "general_information";

      return {
        ...post,
        derivedLocation,
        derivedLabel,
        eventCountry: eventDoc?.country || "N/A",
        eventType: eventDoc?.event_type || "N/A",
      };
    });

    res.json(enrichedPosts);
  } catch (error) {
    console.error("Failed to fetch enriched posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/ask", async (req, res) => {
  try {
    const q = (req.query.q || "").toLowerCase().trim();

    if (!q) {
      return res.status(400).json({ error: "Query is required" });
    }

    let eventName = null;

    if (q.includes("mexico") && q.includes("earthquake")) {
      eventName = "mexico_earthquake";
    } else if (q.includes("harvey")) {
      eventName = "hurricane_harvey";
    } else if (q.includes("irma")) {
      eventName = "hurricane_irma";
    } else if (q.includes("maria")) {
      eventName = "hurricane_maria";
    } else if (q.includes("california") && q.includes("wildfire")) {
      eventName = "california_wildfires";
    } else if (q.includes("iraq") || q.includes("iran")) {
      eventName = "iraq_iran_earthquake";
    } else if (q.includes("sri lanka") || q.includes("srilanka")) {
      eventName = "srilanka_floods";
    }

    if (!eventName) {
      return res.json({
        detected_event: null,
        summary: "Could not confidently map the query to a known event.",
        posts: [],
        annotations: [],
        media: [],
      });
    }

    const eventDoc = await mongoose.connection.db
      .collection("events")
      .findOne({ event_name: eventName });

    const posts = await mongoose.connection.db
      .collection("posts")
      .find({ event_name: eventName })
      .limit(20)
      .toArray();

    const annotations = await mongoose.connection.db
      .collection("annotations")
      .find({ event_name: eventName })
      .toArray();

    const media = await mongoose.connection.db
      .collection("media")
      .find({ event_name: eventName })
      .limit(10)
      .toArray();

    const annotationMap = new Map();
    for (const ann of annotations) {
      annotationMap.set(String(ann.tweet_id), ann);
    }

    const enrichedPosts = posts.map((post) => {
      const ann = annotationMap.get(String(post.id)) || {};

      const derivedLocation =
        post?.place?.full_name ||
        post?.user?.location ||
        eventDoc?.country ||
        eventDoc?.region ||
        "Location not available";

      const derivedLabel =
        ann?.image_damage && ann.image_damage !== "nan"
          ? ann.image_damage
          : ann?.text_human && ann.text_human !== "not_humanitarian"
          ? ann.text_human
          : ann?.image_human && ann.image_human !== "not_humanitarian"
          ? ann.image_human
          : ann?.text_info
          ? ann.text_info
          : ann?.image_info
          ? ann.image_info
          : "Label not available";

      return {
        ...post,
        derivedLocation,
        derivedLabel,
        eventCountry: eventDoc?.country || "N/A",
        eventType: eventDoc?.event_type || "N/A",
      };
    });

    res.json({
      detected_event: eventName,
      summary: `Showing intelligence for ${eventName} in ${eventDoc?.country || "the affected region"}.`,
      posts: enrichedPosts,
      annotations,
      media,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process query" });
  }
});

app.get("/videos/:event", async (req, res) => {
  try {
    const videos = await mongoose.connection.db
      .collection("media")
      .find({
        event_name: req.params.event,
        media_type: "video",
      })
      .limit(10)
      .toArray();

    res.json(videos);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
