def retrieve_multimodal(data, event, intent):

    intent_keywords = {
        "damage": ["damage", "flood", "destroyed", "collapsed"],
        "casualties": ["dead", "injured", "killed"],
        "rescue": ["rescue", "help", "evacuate"]
    }

    keywords = intent_keywords.get(intent, [])

    results = []

    for item in data:
        if item["event"] != event:
            continue

        text = item["text"].lower()

        score = sum(1 for k in keywords if k in text)

        if score > 0:
            results.append((item, score))

    # sort by relevance
    results.sort(key=lambda x: x[1], reverse=True)

    posts, images, videos = [], [], []

    for item, _ in results[:10]:
        posts.append(item["text"])

        if "image" in item:
            images.append(item["image"])

        if "video" in item:
            videos.append(item["video"])

    return {
        "posts": posts[:5],
        "images": images[:5],
        "videos": videos[:2]
    }
