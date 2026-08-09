
"use client"
import { HTTP_BACKEND, WS_URL } from "@/config"

import { useEffect,  useState } from "react"
import Canvas from "./Canvas"

import api from "@/lib/api"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"






export default function RoomCanvas ({slug}:{slug:string}){
    const router = useRouter()
    const [socket,setSocket] = useState<WebSocket|null>(null)
    const [roomId,setRoomId] = useState<number | null>(null)
    const [error, setError] = useState("")

    useEffect(() => {
    async function loadRoom() {
        try {
            const res = await api.get(`${HTTP_BACKEND}/room/${encodeURIComponent(slug)}`)
            setRoomId(res.data.roomId)
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 401) {
                router.replace("/signin")
                return
            }
            setError("This room could not be opened. It may no longer exist.")
        }
    }

    loadRoom()
}, [slug, router])

    useEffect(()=>{
         if(roomId === null){
            return
         }
        
        
        const token = localStorage.getItem("token")
        if (!token) {
            router.replace("/signin")
            return
        }
        const ws = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}`);


        ws.onopen= ()=>{
           
            setSocket(ws)
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
        }
        ws.onerror = () => setError("Unable to connect to the realtime server.")
        ws.onclose = (event) => {
            if (event.code === 1008) {
                localStorage.removeItem("token")
                router.replace("/signin")
            } else if (!event.wasClean) {
                setError("Realtime connection was lost. Refresh to reconnect.")
            }
        }
       
        return ()=>{
            ws.close()

        }
    },[roomId, router])

    if(error){
        return <div>{error}</div>
    }
    if(roomId === null){
        return <div>Loading room...</div>
    }
    if(!socket){
        return <div>
            Connecting to server....
        </div>
    }

    return <div>
        <Canvas roomId ={roomId} socket={socket}  />
        
        
    </div>
}
