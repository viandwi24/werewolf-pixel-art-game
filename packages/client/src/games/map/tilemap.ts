import Phaser from 'phaser'

export class Tilemap {
  data!: any
  map!: Phaser.Tilemaps.Tilemap

  constructor(public scene: Phaser.Scene, public key: string, url: string) {
    const loader = scene.load.tilemapTiledJSON(key, url)
    loader.once(Phaser.Loader.Events.FILE_COMPLETE, (fKey: string, fType: string, file: { data: any }) => {
      if (key === fKey && fType === 'tilemapJSON') {
        const mapData = file.data
        this.data = mapData
        // console.log('mapData', mapData)
        // this.data = this.buildData(data)

        // load tilesets
        for (const tileset of mapData.tilesets) {
          if (scene.textures.exists(tileset.name)) return
          const tilesetUrl = (url.split('/').splice(0, url.split('/').length-1).join('/')) + '/' + (tileset as any).image
          const opts = {
            frameWidth: tileset.tilewidth,
            frameHeight: tileset.tileheight,
          }
          scene.load.spritesheet(
            tileset.name,
            tilesetUrl,
            opts
          )
        }
        scene.load.start()
      }
    })
    scene.events.once(Phaser.Scenes.Events.CREATE, () => {
      let i = 0
      while (i < 100 * 1) {
        i++
      }
      this.create()
    })
    console.log('1')
  }

  preload() {
    // create tilesets
    // const tilesets: Phaser.Tilemaps.Tileset[] = []
    // for (const tileset of map.tilesets) {
    //   tilesets.push(
    //     map.addTilesetImage(
    //       tileset.name,
    //       tileset.name,
    //       tileset.tileWidth,
    //       tileset.tileHeight,
    //       undefined,
    //       tileset.tileSpacing,
    //     )
    //   )
    // }
  }

  create() {
    console.log('2', this.data)
    const map = this.scene.add.tilemap(
      this.key,
      this.data.tilewidth,
      this.data.tileheight,
      this.data.width,
      this.data.height
    )
    this.map = map
    
    // create tilesets
    console.log('3')
    const tilesets: Phaser.Tilemaps.Tileset[] = []
    for (const tileset of this.data.tilesets) {
      // console.log(tileset.name, this.scene.textures.get(tileset.name))
      tilesets.push(
        map.addTilesetImage(
          tileset.name,
          tileset.name,
          tileset.tilewidth,
          tileset.tileheight,
          undefined,
          tileset.tilespacing,
        )
      )
    }
    // console.log(tilesets)
    console.log('4')

    // create layers
    for (const layer of map.layers) {
      map.createLayer(layer.name, tilesets)
    }
    // console.log(map)
    console.log('5')
  }
}
