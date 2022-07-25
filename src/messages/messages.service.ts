import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'test user', text: 'first hardcoded data' }];
  clientToUser = {};

  // create(createMessageDto: CreateMessageDto) {
  //   console.log('Got Message');
  create(createMessageDto: CreateMessageDto, clientId: string) {
    // console.log(clientId)
    // const message = { ...createMessageDto };
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(createMessageDto);
    console.log(message);
    return message;
  }

  identifyClient(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    console.log(this.clientToUser);

    return Object.values(this.clientToUser);
    // return 'Joined Successfully';
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  findAll() {
    return this.messages;
  }
}
