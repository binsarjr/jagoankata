import { json, type RequestHandler } from '@sveltejs/kit'
import { parse } from 'csv-string'
import type { KataKataInspirasi } from '../../../../../../../../Workspace/BINSAR/program/jagoankata/src/app'

export const GET: RequestHandler = async ({ setHeaders, url }) => {
    let data: KataKataInspirasi[] = []

    const urls = [
        'https://raw.githubusercontent.com/binsarjr/koleksi-jagoankata/results/filsuf.csv',
        'https://github.com/binsarjr/koleksi-jagoankata/raw/results/brainyquote.csv',
        'https://github.com/binsarjr/koleksi-jagoankata/raw/results/www.goodreads.com.csv'
    ]
    const target = new URL(url.toString())
    target.pathname = '/data/filsuf.csv'
    urls.push(target.toString())

    const results = await Promise.all(urls.map(async url => {
        const resp = await fetch(target.toString())
        // @ts-ignore
        return parse(await resp.text(), {
            output: "objects"
        }) as KataKataInspirasi[]
    }))


    data = results.flat()



    setHeaders({
        'cache-control': 'public,max-age: 60'
    })
    return json(data)
}