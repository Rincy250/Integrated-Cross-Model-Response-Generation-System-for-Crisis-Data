# Integrated-Cross-Model-Response-Generation-System-for-Crisis-Data
A multi-modal AI web app that turns natural language disaster queries into structured, evidence-backed answers. Built on CrisisMMD.

<img width="2838" height="1534" alt="image" src="https://github.com/user-attachments/assets/50b66d86-d110-4665-89fd-ab071c7e40c2" />

<img width="2767" height="1190" alt="image" src="https://github.com/user-attachments/assets/497e2bd2-cb3e-4dac-910f-80a972b59dba" />

<img width="2780" height="1107" alt="image" src="https://github.com/user-attachments/assets/6d3140ad-e654-430a-90c3-687dda3a5119" />

<img width="2749" height="1175" alt="image" src="https://github.com/user-attachments/assets/04b3c83c-645c-4f06-9ff9-a431100b6727" />

<img width="2739" height="1429" alt="image" src="https://github.com/user-attachments/assets/6099f1e8-6948-48fe-914c-1dfff723d1d1" />

<img width="2670" height="1186" alt="image" src="https://github.com/user-attachments/assets/3e9eb986-9fb5-4214-9d42-427ac62dd5ae" />

<img width="2571" height="1526" alt="image" src="https://github.com/user-attachments/assets/b475df8d-1615-4527-816e-e39769516e32" />



Demo · Architecture · Installation · Usage · Evaluation
</div>


Overview
During natural disasters, social media produces an overwhelming volume of text, images, and videos. First responders, journalists, and analysts need fast, query-able access to verified information — but conventional search tools handle only one modality at a time.
This project closes that gap. It's a full-stack web application that accepts natural-language questions about historical disasters (e.g. "What damage happened in Hurricane Maria?") and returns structured, multi-modal answers by fusing text retrieval, image retrieval, and response generation across multiple deep learning models.
Built on the CrisisMMD v2.0 dataset covering 7 major 2017 natural disasters.
Key Features

Natural language query interface — ask in plain English, no schema required
6 query intents automatically detected — damage, casualties, rescue, location, timeline, and summary
5 intent-specific result layouts — casualty reports show extracted mentions, timeline queries show event charts, location queries show regional breakdowns + a geo map, etc.
Multi-modal retrieval — text tweets + satellite imagery + news video fused into a single ranked response
Live pipeline visualization on the homepage — animated architecture diagram showing how each query flows through the system
7 disasters indexed with 18,000+ tweets and 11,000+ linked images
Severity classification — automatically assigns Low / Moderate / High / Critical levels

Demo

Run the app locally (see Installation below), open http://localhost:5173, and try any of:

"What damage happened in Hurricane Maria?"
"Casualties in Iran-Iraq earthquake"
"When did Sri Lanka floods peak?"
"Rescue operations in Hurricane Harvey"
"Where did Mexico earthquake strike"

System Architecture

┌────────────────┐   ┌──────────────────┐   ┌───────────────────────┐   ┌───────────────────┐   ┌────────────────┐
 │  Natural Lang. │──▶│ Intent Classifier│──▶│ Multi-Modal Retrieval │──▶│ Cross-Model Fusion│──▶│ Response Gen.  │
 │  "what damage" │   │   BERT · 6 cls   │   │  Text · Image · Video │   │  Evidence ranking │   │    Flan-T5     │
 └────────────────┘   └──────────────────┘   └───────────────────────┘   └───────────────────┘   └────────────────┘

 Five pipeline stages:

1.Natural Language Parsing — user query tokenized
2.Intent Classifier (BERT) — routes to one of 6 response templates
3.Multi-Modal Retrieval — parallel text / image / video lookup
4.Cross-Model Fusion — candidate re-ranking using a weighted score
5.Response Generator — synthesizes a structured answer

Tech Stack 

<img width="940" height="721" alt="image" src="https://github.com/user-attachments/assets/2f17fde0-36bb-43c8-b8e9-7f1941e4c7d6" />

Project Structure

Disaster_Intelligence_System/
│
├── Frontend/                          # React + Vite SPA
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Landing page with pipeline diagram
│   │   │   ├── Home.css
│   │   │   ├── Results.jsx            # 5 intent-specific result layouts
│   │   │   └── Results.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── Backend/                           # Flask REST API
│   ├── app.py                         # /parse endpoint
│   ├── models/
│   │   ├── intent_classifier.py       # BERT fine-tuned on 6 intents
│   │   ├── image_retriever.py         # CLIP-based cross-modal search
│   │   └── response_generator.py      # Flan-T5 response synthesis
│   ├── data/
│   │   └── crisismmd/                 # Preprocessed corpus
│   └── requirements.txt
│
├── docs/                              # Screenshots, architecture diagrams
├── .gitignore
├── README.md
└── LICENSE

Installation
Prerequisites
1.Node.js 18+ and npm
2.Python 3.10+
3.Git

1.Clone the Repository

git clone https://github.com/Rincy250/Integrated-Cross-Model-Response-Generation-System-for-Crisis-Data.git
cd Integrated-Cross-Model-Response-Generation-System-for-Crisis-Data

2.Set up the backend

cd Backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py

3.Set up the frontend 
In seperate Terminal
cd Frontend
npm install
npm run dev

Frontend runs on http://localhost:5173

Usage

1.Open http://localhost:5173 in your browser.
2.Type a question in plain English, or click one of the 5 category chips (Damage · Casualty · Rescue · Location · Timeline) to auto-fill an example.
3.Press Ask — the query is sent to the Flask backend, which classifies the intent, retrieves evidence, and returns a structured response.
4.The Results page renders one of 5 layouts depending on the detected intent.

Evaluation
Benchmarked on a held-out split of the CrisisMMD v2.0 test set:

<img width="982" height="423" alt="image" src="https://github.com/user-attachments/assets/38395178-bbe3-46a6-9984-889aa3f62e00" />

Dataset
CrisisMMD v2.0 — Alam, F., Ofli, F., & Imran, M. (2018). CrisisMMD: Multimodal Twitter Datasets from Natural Disasters. ICWSM.
Coverage: 7 disasters · 18,126 tweets · 11,522 images

<img width="835" height="635" alt="image" src="https://github.com/user-attachments/assets/8864862a-6e7d-4f3e-89e6-dd8cd54feb1d" />

API Reference
POST /parse
Request body:
{ "query": "what damage happened in Hurricane Maria" }
Response:
{
  "event": "hurricane_maria",
  "type": "damage",
  "damage": {
    "severity": "CRITICAL",
    "summary": "Hurricane Maria caused catastrophic infrastructure damage..."
  },
  "data": {
    "posts": [ ... ],
    "images": [ ... ],
    "videos": [ ... ]
  }
}

Limitations & Future Work

1.Corpus fixed to 7 disasters from 2017 — real-time Twitter ingestion would let it handle live events.
2.English-only (inherited from CrisisMMD).
3.CLIP is trained on general web images; a disaster-specific contrastive model would likely improve image relevance.
4.No user authentication or query history — easy additions via Firebase/JWT.

Contributor:
Rincy Chettupalli - 

License
Distributed under the MIT License. See LICENSE for details.

Acknowledgements

Alam, Ofli, and Imran for the CrisisMMD dataset
Hugging Face Transformers
OpenAI CLIP
The React and Flask open-source communities
