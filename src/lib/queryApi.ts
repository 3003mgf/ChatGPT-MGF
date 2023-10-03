import openai from "./chatGPT";


// NOTE: 'temperature' and 'top_p' basically set the creativity level of the answer

const queryAPI = async(prompt:string, chatId:string, model:string) => {
  try{
    const completion = await openai.completions.create({
      model: model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    return completion.choices[0].text;

  }catch(error){
    console.log(error); 
  }
};

export default queryAPI;