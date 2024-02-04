import gensim
import gensim.downloader as api

model = api.load("glove-twitter-25")

model.most_similar(["data", "science"])

# Text Preprocessing



# Training the model

# Evaluating results


