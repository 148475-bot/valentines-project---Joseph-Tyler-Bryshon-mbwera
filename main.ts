 namespace SpriteKind {
    export const Decal = SpriteKind.create()
    export const NPC = SpriteKind.create()
}

// -------------- DATA STRUCTURES -----------------------
//creating new types and interfaces is a touch too much 
//for what I want to cover in this class. 

//if you are confused about any of this let me know

interface Choice {
    id: string
    text: string
    nextScene?: string // used when no skill check exists
}

interface Scene {
    id: string
    title: string
    description: string
    choices: Choice[]
}

// -------- DATA ----------

const scenes: Scene[] = [
    {
        id: "start",
        title: "Grocery Collision",
        description: "It's Valentine's Day. You bump into a girl carrying groceries. Apples roll everywhere.",
        choices: [
            {
                id: "help_groceries",
                text: "Help her pick up the groceries",
                nextScene: "grocery_help"
            },
            {
                id: "walk_away",
                text: "Walk away and pretend nothing happened",
                nextScene: "park_scene"
            }
        ]
    },

    {
        id: "grocery_help",
        title: "Helpful Stranger",
        description: "You help her gather the groceries. She laughs and thanks you, then asks if you want to grab coffee.",
        choices: [
            {
                id: "confident_yes",
                text: "Say yes confidently",
                nextScene: "coffee_scene"
            },
            {
                id: "trip_yes",
                text: "Say yes but trip immediately (Balance Check)",
                nextScene: "balance_check"
            },
            {
                id: "awkward_no",
                text: "Say no and wave awkwardly",
                nextScene: "surprise_end_awkward"
            }
        ]
    },

    {
        id: "balance_check",
        title: "Balance Check",
        description: "You stumble mid-sentence. This could go either way.",
        choices: [
            {
                id: "recover",
                text: "Recover smoothly",
                nextScene: "coffee_scene"
            },
            {
                id: "fall_display",
                text: "Fall into a grocery display",
                nextScene: "surprise_end_gravity"
            }
        ]
    },

    {
        id: "coffee_scene",
        title: "Coffee Shop Chaos",
        description: "You buy coffee for both of you, but your card declines. She steps in and pays.",
        choices: [
            {
                id: "apologize",
                text: "Apologize sincerely (Charisma Check)",
                nextScene: "charisma_check"
            },
            {
                id: "cash_offer",
                text: "Offer to pay with cash",
                nextScene: "good_end"
            },
            {
                id: "joke",
                text: "Make a joke about it (Charisma Check)",
                nextScene: "charisma_check"
            }
        ]
    },

    {
        id: "charisma_check",
        title: "Charisma Check",
        description: "Your words hang in the air. How do they land?",
        choices: [
            {
                id: "success",
                text: "She laughs",
                nextScene: "good_end"
            },
            {
                id: "fail",
                text: "Awkward silence",
                nextScene: "bad_end"
            }
        ]
    },

    {
        id: "park_scene",
        title: "Park Encounter",
        description: "You go to the park to clear your head — and see her there feeding ducks.",
        choices: [
            {
                id: "ask_coffee_again",
                text: "Ask her to get coffee",
                nextScene: "bad_end"
            },
            {
                id: "ask_day",
                text: "Ask how her day is",
                nextScene: "park_scene_2"
            },
            {
                id: "hide_tree",
                text: "Hide behind a tree (Stealth Check)",
                nextScene: "stealth_check"
            }
        ]
    },

    {
        id: "stealth_check",
        title: "Stealth Check",
        description: "You attempt to hide. Poorly.",
        choices: [
            {
                id: "not_spotted",
                text: "She doesn't notice you",
                nextScene: "surprise_end_escape"
            },
            {
                id: "spotted",
                text: "She notices immediately",
                nextScene: "park_scene_2"
            }
        ]
    },

    {
        id: "park_scene_2",
        title: "Second Chance",
        description: "She relaxes and chats with you, then invites you to grab coffee.",
        choices: [
            {
                id: "say_yes",
                text: "Say yes",
                nextScene: "coffee_scene"
            },
            {
                id: "duck_joke",
                text: "Say yes, but invite the ducks too (Humor Check)",
                nextScene: "humor_check"
            }
        ]
    },

    {
        id: "humor_check",
        title: "Humor Check",
        description: "The ducks react before she does.",
        choices: [
            {
                id: "laughs",
                text: "She laughs",
                nextScene: "coffee_scene"
            },
            {
                id: "ducks_flee",
                text: "The ducks scatter dramatically",
                nextScene: "surprise_end_ducks"
            }
        ]
    }
];


// ---------- CHOICES HELPER FUNCTIONS -----------

function getSceneById(id: string): Scene | undefined {
    return scenes.find(scene => scene.id === id)
}

function getChoice(choiceText: string): Choice | undefined {
    // Loop through all scenes to find the choice
    for (let scene of scenes) {
        // Loop through each choice in the scene
        for (let choice of scene.choices) {
            if (choice.text === choiceText) {
                return choice // Return the matching choice
            }
        }
    }
    return undefined // If no matching choice is found
}

function handleChoices(sce: Scene) {
    story.printText(sce.description, 80, 90)

    // Show the choices to the player one by one
    let choiceTexts: string[] = []
    for (let choice of sce.choices) {
        choiceTexts.push(choice.text)
    }
    story.showPlayerChoices(choiceTexts[0], choiceTexts[1], choiceTexts[2]) // Display the choices 

    // After the player picks a choice, check the result
    story.startCutscene(function () {
        let selectedChoice = story.getLastAnswer() // Get the last answer as a string

        let choice = getChoice(selectedChoice)

        console.log('attempting to handle choice: ' + choice)

        if (choice) {
            // If there is a next scene, transition to it
            transitionToNextScene(choice.nextScene)
        }
    })
}

function transitionToNextScene(sceneId: string) {
    console.log('attempting to transition')
    let nextScene = getSceneById(sceneId)

    if (nextScene) {
        console.log('handling next scene: ' + nextScene)
        if (nextScene.id === 'grocery_help') {
            scene.setBackgroundImage(assets.image`asdf`)
        } else if(nextScene.id === 'balance_check') { 
            scene.setBackgroundImage(assets.image`balance bg`) //TODO: Create this background
        } else if(nextScene.id === 'coffee_scene') {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
        } else if(nextScene.id === 'charisma_check') {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
        } else if(nextScene.id === 'park_scene') {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
        } else if(nextScene.id === 'stealth_check') {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
        } else if(nextScene.id === 'park_scene_2'){
            scene.setBackgroundImage(assets.image`bg`)

        } else if(nextScene.id === 'humor_check')
        //TODO: Handle more scenes here

        handleChoices(nextScene)
    } else {
        // Handle ending scenes
        console.log('handling ending scene: ' + sceneId)
        if (sceneId === "good_end") {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
            story.printText("You exchange numbers, laugh together, and save Valentine's Day.", 80, 90)
        } else if (sceneId === "bad_end") {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
            story.printText("She gets offended and leaves without saying anything.", 80, 90)
        } else if (sceneId === "surprise_end_awkward") {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
            story.printText("You wave so hard you knock over the groceries again. She backs away slowly.", 80, 90)
        } else if (sceneId === "surprise_end_gravity") {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
            story.printText("You fall into a grocery display. The store applauds. She disappears.", 80, 90)
        } else if (sceneId === "surprise_end_escape") {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
            story.printText("You successfully hide and leave the park forever. Alone.", 80, 90)
        } else if (sceneId === "surprise_end_ducks") {
            scene.setBackgroundImage(assets.image`bg`) //TODO: Create this background
            story.printText("The ducks scatter. Romance does too.", 80, 90)
        }
    }
}

// ---------- GAME HELPER FUNCTIONS ------------

function initializeElements() { //setup for some of the UI changes
    game.setDialogCursor(assets.image`a-button`)
}

function startStory() {
    let firstScene = getSceneById("start")
    if (firstScene) {
        handleChoices(firstScene)
    }
}

function runGame() {
    tiles.setCurrentTilemap(tilemap`level`)
    scene.cameraFollowSprite(playerSprite)
    startStory()
}

function startGame() {
    game.splash('Valentines Template: ', 'Your subtitle here') //Todo: please update your games name
    runGame()
}   

// ----------- CONTROLLER TRIGGERS --------------

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    
})

// ------------- OVERLAP TRIGGERS ------------------

sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    //
})

// ------------ Game Update Triggers --------------

game.onUpdate(function () {
    //if we want to constantly check for certain conditions, we can do so here.
})

// ------------- GLOBAL VARIABLES ------------------

//game UI props
let playerSprite: Sprite = null
let npcSprite: Sprite = null

npcSprite = sprites.create(assets.image`npc`, SpriteKind.NPC)
npcSprite.setPosition(90, 90)

// ------------- RUNNING THE GAME ------------------
initializeElements()
startGame()
