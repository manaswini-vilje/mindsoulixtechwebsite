import { Project } from "../types/project"

const image1 =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600"

const image2 =
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600"

const image3 =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600"

function createTiles(image: string) {
  return [
    {
      id: "1",
      image,
      colSpan: 3,
      rowSpan: 2,
      colStart: 1,
      rowStart: 1,
      content: (
        <div>
          <h2 className="text-2xl font-semibold">Project Title</h2>
          <p className="text-gray-600 mt-2">Enterprise Analytics Platform</p>
        </div>
      ),
    },
    {
      id: "2",
      image,
      colSpan: 3,
      rowSpan: 2,
      colStart: 4,
      rowStart: 1,
      content: (
        <div>
          <h2 className="text-2xl font-semibold">Impact</h2>
          <p className="text-gray-600 mt-2">
            Reduced processing time by 60% globally.
          </p>
        </div>
      ),
    },
    {
      id: "3",
      image,
      colSpan: 2,
      rowSpan: 1,
      colStart: 1,
      rowStart: 3,
      content: (
        <div>
          <h3 className="text-xl font-semibold">Problem Statement</h3>
          <p className="text-gray-600 mt-2">
            Fragmented data systems across departments.
          </p>
        </div>
      ),
    },
    {
      id: "4",
      image,
      colSpan: 2,
      rowSpan: 1,
      colStart: 3,
      rowStart: 3,
      content: (
        <div>
          <h3 className="text-xl font-semibold">Tech Stack</h3>
          <p className="text-gray-600 mt-2">
            React, Node, PostgreSQL, AWS
          </p>
        </div>
      ),
    },
    {
      id: "5",
      image,
      colSpan: 2,
      rowSpan: 1,
      colStart: 5,
      rowStart: 3,
      content: (
        <div>
          <h3 className="text-xl font-semibold">How We Solved</h3>
          <p className="text-gray-600 mt-2">
            Built distributed real-time analytics architecture.
          </p>
        </div>
      ),
    },
    {
      id: "6",
      image,
      colSpan: 3,
      rowSpan: 1,
      colStart: 1,
      rowStart: 4,
      content: (
        <div>
          <h3 className="text-xl font-semibold">Feedback</h3>
          <p className="text-gray-600 mt-2">
            “A game changer for our operations.”
          </p>
        </div>
      ),
    },
    {
      id: "7",
      image,
      colSpan: 3,
      rowSpan: 1,
      colStart: 4,
      rowStart: 4,
      content: (
        <div>
          <h3 className="text-xl font-semibold">Metrics</h3>
          <p className="text-gray-600 mt-2">
            55k+ shipments processed.
          </p>
        </div>
      ),
    },
    {
      id: "8",
      image,
      colSpan: 6,
      rowSpan: 1,
      colStart: 1,
      rowStart: 5,
      content: (
        <div>
          <h3 className="text-xl font-semibold">Summary</h3>
          <p className="text-gray-600 mt-2">
            Scalable enterprise-grade transformation.
          </p>
        </div>
      ),
    },
  ]
}

export const projectsData: Project[] = [
  {
    id: "p1",
    title: "Project One",
    image: image1,
    tiles: createTiles(image1),
  },
  {
    id: "p2",
    title: "Project Two",
    image: image2,
    tiles: createTiles(image2),
  },
  {
    id: "p3",
    title: "Project Three",
    image: image3,
    tiles: createTiles(image3),
  },
]