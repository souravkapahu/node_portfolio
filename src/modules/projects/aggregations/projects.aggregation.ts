import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../schemas/projects.schema';
import { Model } from 'mongoose';
import { log } from 'console';

@Injectable()
export class ProjectAggregationService {
    constructor(@InjectModel(Project.name) private Project: Model<Project>) { }

    async getProjectsList(body: any) {
        const { offset = 0, limit = 10, user } = body

        return this.Project.aggregate([
            {
                $match: {
                    user
                }
            },
            {
                $project: {
                    updatedAt: 0,
                    __v: 0
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $facet: {
                    data: [
                        {
                            $skip: offset
                        },
                        {
                            $limit: limit
                        }
                    ],
                    total: [
                        {
                            $count: 'count'
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    data: 1,
                    totalCount: { $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0] }
                }
            }
        ]);
    }
}
