import openai from '@/lib/chatGPT';
import queryAPI from '@/lib/queryApi';
import { NextResponse } from 'next/server';
 

export async function POST(request: Request) {
  const req = await request.json();
  
  const { prompt, session, chatId, model } = req;
  

  if(!prompt){
    return NextResponse.json({answer: "Please provide a prompt!"});
  };
  if(!chatId){
    return NextResponse.json({answer: "Please provide a chatId!"});
  };

  // ChatGPT Query
  const response = await queryAPI(prompt, chatId, model);


  
  
  return NextResponse.json({answer: response});
}

type Option = {
  value: string,
  label: string
};

type Data = {
  modelOptions: Option[];
};

export async function GET(request: Request) {
  
  
  const models = await openai.models.list();

  const modelOptions = models.data.map(model => ({
    value: model.id,
    label: model.id
  }));
  
  
  return NextResponse.json({modelOptions});
}