from nlp_processing import preprocess


skill_database = [

"python","java","c","c++","javascript","typescript",

"html","css","react","angular","vue","nodejs","express",

"sql","mysql","postgresql","mongodb",

"machine learning","deep learning","nlp",

"pandas","numpy","tensorflow","pytorch",

"docker","kubernetes","aws","azure",

"git","github","linux",

"data analysis","data science"

]


def extract_skills(text):

    if not text:
        return []

    clean_text = preprocess(text)

    skills = []

    for skill in skill_database:

        if skill in clean_text and skill not in skills:
            skills.append(skill)

    return skills