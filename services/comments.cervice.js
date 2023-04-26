import { axiosClassic } from '../api/api'

export const CommentsService = {
  async getCommentsById(id) {
    return axiosClassic.get(`/posts/${id}/comments`)
  },
  async postComment(id, body) {
    return axiosClassic.post(`/posts/${id}/comments`, body)
  },
  async postReply(postId, commentId, body) {
    return axiosClassic.post(`/posts/${postId}/comments/${commentId}/replies`, body)
  },
}
