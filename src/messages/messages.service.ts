import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{name: 'test user', text: 'first hardcoded data'}]
  clientToUser = {}

  create(createMessageDto: CreateMessageDto, clientId: string) {
    console.log(clientId)
    const message = {...createMessageDto}
    // const message = {
    //   name: this.clientToUser[clientId],
    //   text: createMessageDto.text
    // }
    this.messages.push(createMessageDto)
    return message;
  }

  identifyClient(name: string, clientId: string){
    this.clientToUser[clientId] = name;
    console.log(this.clientToUser)

    return Object.values(this.clientToUser)
  }

  getClientName(clientId: string){
    return this.clientToUser[clientId]
  }

  findAll() {
    return this.messages;
  }

}
