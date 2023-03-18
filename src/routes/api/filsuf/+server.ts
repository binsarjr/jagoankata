import { json, type RequestHandler } from '@sveltejs/kit'
import csvParser from 'csv-parser'
import fs from 'fs'
import path from 'path'
import type { KataKataInspirasi } from '../../../../../../../../Workspace/BINSAR/program/jagoankata/src/app'

export const GET: RequestHandler = async ({ setHeaders}) => {
    const data: KataKataInspirasi[] = []
    await new Promise((resolve) => {
        const filepath = path.join('../../..', 'data', 'filsuf.csv')
        fs.createReadStream(filepath)
            .pipe(csvParser())
            .on('data', d => data.push(d))
            .on('end', resolve)
    })
    setHeaders({
        'cache-control': 'public,max-age: 60'
    })
    return json(data)
}