"use client"

import { HTTP_BACKEND } from "@/config"
import api from "@/lib/api"
import { AxiosError } from "axios"
import { LogIn, PenLine, PlusCircle, UsersRound } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type RoomAction = "create" | "join" | null

export default function RoomPage() {
  const router = useRouter()
  const [slug, setSlug] = useState("")
  const [error, setError] = useState("")
  const [pendingAction, setPendingAction] = useState<RoomAction>(null)

  function getRoomName() {
    const roomName = slug.trim()
    if (!roomName) {
      setError("Enter a room name to continue.")
      return null
    }
    return roomName
  }

  async function createRoom(event: React.FormEvent) {
    event.preventDefault()
    const roomName = getRoomName()
    if (!roomName) return

    setError("")
    setPendingAction("create")

    try {
      await api.post(`${HTTP_BACKEND}/room`, { slug: roomName })
      router.push(`/canvas/${roomName}`)
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        router.push("/signin")
        return
      }
      setError("Unable to create this room. Try a different name or sign in first.")
    } finally {
      setPendingAction(null)
    }
  }

  async function joinRoom() {
    const roomName = getRoomName()
    if (!roomName) return

    setError("")
    setPendingAction("join")

    try {
      await api.get(`${HTTP_BACKEND}/room/${encodeURIComponent(roomName)}`)
      router.push(`/canvas/${roomName}`)
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        router.push("/signin")
        return
      }
      if (error instanceof AxiosError && error.response?.status === 404) {
        setError("We couldn’t find a room with that name.")
        return
      }
      setError("Unable to join the room. Please try again.")
    } finally {
      setPendingAction(null)
    }
  }

  const isLoading = pendingAction !== null

  return (
    <main className="min-h-screen bg-[#f4f6fa] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-5">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-[#073b8e]">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[#073b8e] text-white">
              <PenLine size={15} />
            </span>
            Draw-App
          </Link>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-56px)] max-w-6xl items-center justify-center px-5 py-12">
        <div className="w-full max-w-[440px]">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-100 text-[#073b8e]">
              <UsersRound size={24} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">Create or join a room</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Invite your team to a shared canvas and start drawing together in real time.
            </p>
          </div>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:p-7">
            <form onSubmit={createRoom} className="space-y-5">
              <label htmlFor="slug" className="flex flex-col gap-2 text-sm font-semibold text-slate-800">
                Room name
                <input
                  id="slug"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="e.g. product-planning"
                  autoComplete="off"
                  disabled={isLoading}
                  className="h-12 rounded-sm border border-slate-300 px-3 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-[#073b8e] focus:ring-2 focus:ring-[#073b8e]/10 disabled:bg-slate-50"
                />
              </label>

              {error && <p role="alert" className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#073b8e] px-4 text-sm font-bold text-white transition hover:bg-[#052f72] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <PlusCircle size={18} />
                {pendingAction === "create" ? "Creating room..." : "Create room"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs font-medium text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              onClick={joinRoom}
              disabled={isLoading}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white px-4 text-sm font-bold text-[#073b8e] transition hover:border-[#073b8e] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <LogIn size={18} />
              {pendingAction === "join" ? "Joining room..." : "Join room"}
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}
