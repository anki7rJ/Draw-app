import { WebSocketServer,WebSocket }  from 'ws'
import  jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'

import { prisma } from "@repo/db/prisma";
import { CustomUserPayload } from '../types/express';

const port = Number(process.env.PORT) || 8080
const wss = new WebSocketServer({ port})

interface User{
    ws:WebSocket,
    userId:string,
    rooms:Set<number>
}

const users:User[] = []

wss.on('connection',(ws,request)=>{
    
    try {
        
        const url = new URL(
            request.url ||"","http://localhost"
        )
        const token = url.searchParams.get("token")
        

    if(!token){
        
        ws.close()
        return
    }

    const decoded = jwt.verify(token,JWT_SECRET) 

    if(typeof decoded === "string"){
        ws.close()
        return
    }

    const user = decoded as CustomUserPayload
    const userId= user.id

    users.push({
        userId,
        rooms:new Set(),
        ws
    })

    ws.on('message',async(data)=>{
        let parsedData: { type?: string; roomId?: unknown; message?: unknown }
        try {
            parsedData = JSON.parse(data.toString())
        } catch {
            ws.close(1008, "Invalid message")
            return
        }
        
        if(parsedData.type === "join_room"){
            const roomId = Number(parsedData.roomId)
            if (!Number.isInteger(roomId)) {
                ws.close(1008, "Invalid room")
                return
            }
            const user = users.find(x=>x.ws===ws)
            user?.rooms.add(roomId)
        }

        if(parsedData.type==="chat"){
            const roomId= Number(parsedData.roomId)
            const message = parsedData.message
            if (!Number.isInteger(roomId) || typeof message !== "string") {
                ws.close(1008, "Invalid message")
                return
            }
            const sender = users.find(user => user.ws === ws)
            if (!sender?.rooms.has(roomId)) {
                ws.close(1008, "Join the room before sending messages")
                return
            }
        
            await prisma.shape.create({
                data:{
                    roomId,
                    message,
                    userId
                }
            })
            

            users.forEach(user=>{
                if(user.rooms.has(roomId) && user.ws.readyState === WebSocket.OPEN){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId
                    }))
                }
            })
        }
    })
    ws.on("close", () => {
        const index = users.findIndex(user => user.ws === ws)
        if (index !== -1) users.splice(index, 1)
    })
        
    } catch (error) {
        ws.close()
        console.log("ERROR:",error)
        
    }

    
})
