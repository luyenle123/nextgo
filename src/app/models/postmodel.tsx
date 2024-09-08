export interface IPostItem{
    id: number, 
    title: string, 
    body: string,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: number,
    userId: number
  }