def generate_answer(intent, posts):

    text = " ".join(posts).lower()

    # severity logic
    if any(word in text for word in ["destroyed", "collapsed", "severe"]):
        severity = "CRITICAL"
    elif any(word in text for word in ["flood", "damage"]):
        severity = "HIGH"
    else:
        severity = "MEDIUM"

    # summary
    summary = " ".join(posts[:2])

    return {
        "severity": severity,
        "summary": summary
    }
