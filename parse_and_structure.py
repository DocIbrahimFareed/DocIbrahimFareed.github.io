import json

# Load the raw_text.json file
with open('raw_text.json') as f:
    data = json.load(f)

# Prepare a structure for questions
questions = []

# Parse questions
for item in data:
    question_text = item.get('question')
    answers = item.get('answers', [])
    correct_answer = None

    # Identify the correct answer
    for answer in answers:
        if answer.get('all_bold'):
            correct_answer = answer['text']
            break

    # Append structured data to questions list
    if question_text and correct_answer:
        questions.append({
            'question': question_text,
            'answer': correct_answer
        })

# Write the structured data to questions.json
with open('questions.json', 'w') as outfile:
    json.dump(questions, outfile, indent=4)
