import axios, { AxiosPromise } from 'axios'

import { ObjectType, templateURL_V1 } from './const'
import { authHeader } from './auth/auth.header'
import { User } from '../types/user.type'

export type CreateCommentDto = {
    text: string,
    objectId: string,
    type: ObjectType
}

export type GetPaginatedCommentsDto = {
    objectId: string,
    type: ObjectType,
    page: number,
    count: number
}

export type CommentDto = {
    id: string,
    linkedTo: string,
    text: string,
    createdAt: Date,
    createdBy: User,
}

export type CommentListDto = {
    totalSize: number
    page: number
    size: number
    list: CommentDto[]
}

export type DeleteCommentDto = {
    type: ObjectType,
    commentId: string
}

export const CreateComment = (dto: CreateCommentDto): AxiosPromise => {
    return axios({
        method: 'POST',
        url: `${templateURL_V1}/comments/${dto.type}/create`,
        headers: authHeader(),
        data: {
            linked_object_id: dto.objectId,
            comment_body: dto.text,
        },
    })
}

export const GetComments = async (dto: GetPaginatedCommentsDto): Promise<CommentListDto> => {
    try {
        let result: CommentDto[] = []

        const response = await axios({
            method: 'GET',
            url: `${templateURL_V1}/comments/${dto.type}/${dto.objectId}/${dto.page}/${dto.count}`,
        })

        const data = response.data.result
        for (const commentData of data.list) {
            result.push({
                id: commentData.id,
                linkedTo: commentData.linked_object_id,
                text: commentData.comment_body,
                createdAt: new Date(commentData.created_at * 1000),
                createdBy: {
                    id: commentData.created_by.id,
                    firstName: commentData.created_by.first_name,
                    secondName: commentData.created_by.second_name,
                    email: commentData.created_by.email,
                    verified: commentData.created_by.verified,
                    photoURL: commentData.created_by?.photo_url,
                    birthDay: commentData.created_by.birth_day === undefined
                        ? undefined
                        : new Date(commentData.created_by.birth_day * 1000),
                },
            })
        }

        return {
            totalSize: data.total_size,
            page: data.page,
            size: data.size,
            list: result
        }
    } catch (err) {
        return {
            totalSize: -1,
            page: -1,
            size: -1,
            list: []
        }
    }
}

export const DeleteComment = async (dto: DeleteCommentDto): Promise<boolean> => {
    try {
        await axios({
            method: 'DELETE',
            url: `${templateURL_V1}/comments/${dto.type}/delete/${dto.commentId}`,
            headers: authHeader()
        })
        return true
    } catch (_) {
        return false
    }
}
