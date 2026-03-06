import { ReactNode } from "react"

export interface Tile {
  id: string
  image: string
  colSpan: number
  rowSpan: number
  colStart: number
  rowStart: number
  content: ReactNode
}

export interface Project {
  id: string
  title: string
  image: string
  tiles: Tile[]
}