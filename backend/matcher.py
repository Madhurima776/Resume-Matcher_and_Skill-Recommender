skill_recommendations = {

    "python": ["numpy", "pandas", "scikit-learn"],
    "machine learning": ["tensorflow", "pytorch"],
    "react": ["redux", "next.js"],
    "docker": ["kubernetes"],
    "data science": ["matplotlib", "seaborn"],
    "sql": ["postgresql", "mysql"]

}


def match_skills(resume_skills, jd_skills):

    matched = []
    missing = []
    suggestions = set()   # use set to avoid duplicates

    for skill in jd_skills:

        if skill in resume_skills:
            matched.append(skill)

        else:
            missing.append(skill)

            if skill in skill_recommendations:
                suggestions.update(skill_recommendations[skill])

    # avoid division by zero
    if len(jd_skills) == 0:
        score = 0
    else:
        score = int((len(matched) / len(jd_skills)) * 100)

    return {
        "matched": matched,
        "missing": missing,
        "suggestions": list(suggestions),
        "score": score
    }