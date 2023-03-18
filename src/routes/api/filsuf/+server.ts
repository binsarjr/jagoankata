import { json, type RequestHandler } from '@sveltejs/kit'
import { parse } from 'csv-string'
import type { KataKataInspirasi } from '../../../../../../../../Workspace/BINSAR/program/jagoankata/src/app'

export const GET: RequestHandler = async ({ setHeaders,url}) => {
    let data: KataKataInspirasi[] = []
    await new Promise(async (resolve) => {
        const target=  new URL(url.toString())
        target.pathname='/data/filsuf.csv'
        const resp = await fetch(target.toString())
        // @ts-ignore
        data=(parse(await resp.text(), {
            output:"objects"
        }))
        resolve(true)
    })
    setHeaders({
        'cache-control': 'public,max-age: 60'
    })
    return json(data)
}