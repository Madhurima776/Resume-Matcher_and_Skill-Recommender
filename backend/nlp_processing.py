import re
import nltk
import spacy
from nltk.corpus import stopwords

# Download stopwords (runs once)
nltk.download("stopwords")

# Load stopwords
stop_words = set(stopwords.words("english"))

# Load spaCy model
nlp = spacy.load("en_core_web_sm")


# ---------------- Text Preprocessing ----------------
def preprocess(text):

    if not text:
        return ""

    # convert to lowercase
    text = text.lower()

    # remove punctuation
    text = re.sub(r"[^\w\s]", " ", text)

    # process with spaCy
    doc = nlp(text)

    tokens = []

    for token in doc:
        if token.text not in stop_words and token.is_alpha:
            tokens.append(token.lemma_)

    clean_text = " ".join(tokens)

    return clean_text