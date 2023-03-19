import { json, type RequestHandler } from '@sveltejs/kit'
import { parse } from 'csv-string'
import type { KataKataInspirasi } from '../../../../../../../../Workspace/BINSAR/program/jagoankata/src/app'

export const GET: RequestHandler = async ({ setHeaders, url }) => {
    let data: KataKataInspirasi[] = []

    const urls = [
        'https://github.com/binsarjr/koleksi-jagoankata/raw/results/filsuf.csv',
        'https://github.com/binsarjr/koleksi-jagoankata/raw/results/brainyquote.csv',
        'https://github.com/binsarjr/koleksi-jagoankata/raw/results/www.goodreads.com.csv'
    ]


    const results = await Promise.all(urls.map(async url => {
        const resp = await fetch(url.toString())
        // @ts-ignore
        return parse(await resp.text(), {
            output: "objects"
        }) as KataKataInspirasi[]
    }))


    data = [...new Set(results.flat())].map(obj => {
        const lowerCaseObj: KataKataInspirasi = {
            author: '',
            text: ''
        }
        Object.entries(obj).forEach(([key, value]) => {
            // @ts-ignore
            lowerCaseObj[key.toLowerCase()] = value
        })
        return lowerCaseObj
    })



    setHeaders({
        'cache-control': 'public,max-age: 60'
    })
    return json(data)
}