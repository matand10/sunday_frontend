import { utilService } from "./util.service"

export const gifService = {
    getGifs
}


function getGifs() {
    return [
        {
            title: 'Alien',
            url: 'https://res.cloudinary.com/dxpb15pfo/image/upload/v1654641443/ALI_ht2exc.gif',
            type: 'gif',
            id: utilService.makeId()
        },
        {
            title: 'Humborger',
            url: 'https://res.cloudinary.com/dxpb15pfo/image/upload/v1654641438/humborger_ndb27o.gif',
            type: 'gif',
            id: utilService.makeId()
        },
        {
            title: 'Sheldon',
            url: 'https://res.cloudinary.com/dxpb15pfo/image/upload/v1654641436/Brandon_kd54d6.gif',
            type: 'gif',
            id: utilService.makeId()
        },
        {
            title: 'Dont know',
            url: 'https://res.cloudinary.com/dxpb15pfo/image/upload/v1654641434/8552_pzgflb.gif',
            type: 'gif',
            id: utilService.makeId()
        },
        {
            title: 'Hummer',
            url: 'https://res.cloudinary.com/dxpb15pfo/image/upload/v1654641410/5db85d8b09392d1b071e4971f5f8d623_t8bhzo.gif',
            type: 'gif',
            id: utilService.makeId()
        },
    ]
}