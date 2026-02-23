let resources = {
    knight: {
        properties:{
            health: 20,
            height: 140,
            width: 100,
            speed: 4
        },
        buttons:[
            [
                ['KeyX'],
                ['push'],
                [0]
            ]
        ],
        abillities:[
            {
                name: 'Rush Nail',
                type: 'middle',
                frame_start: 10,
                frame_attack: 20,
                frame_end: 20,
                attack: {
                    attack_steps: 1,
                    distance: 140,
                    appear_in: 'player_position',
                    move_to_side: 'player_look',
                    special_flags: [
                        'ground'
                    ],
                    sprites: [
                        'image.png'
                    ]
                },
                damage: 1
            }
        ],
        sprites: {
            idle_right: {
                sprite: 'images/sprites/knight/knight_idle_right.png',
                frames: 8,
                replay: true
            },
            idle_left: {
                sprite: 'images/sprites/knight/knight_idle_left.png',
                frames: 8,
                replay: true
            },
            walk_right: {
                sprite: 'images/sprites/knight/knight_walk_right.png',
                frames: 9,
                replay: true
            },
            walk_left: {
                sprite: 'images/sprites/knight/knight_walk_left.png',
                frames: 9,
                replay: true
            },
            jump_right: {
                sprite: 'images/sprites/knight/knight_jump_right.png',
                frames: 5,
                replay: false
            },
            jump_left: {
                sprite: 'images/sprites/knight/knight_jump_left.png',
                frames: 5,
                replay: false
            },
            fall_right: {
                sprite: 'images/sprites/knight/knight_fall_right.png',
                frames: 3,
                replay: false
            },
            fall_left: {
                sprite: 'images/sprites/knight/knight_fall_left.png',
                frames: 3,
                replay: false
            },
        }
    }
}