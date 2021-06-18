
// Adds hits to a song. The main purpose of this class was to enable quantizing,
// but quantizing was abandoned after several tricky bugs arose.
class Recorder {

    newHits

    constructor() {
        this.newHits = []
    }

    addHitToSong(name) {
        // get the slot that is the closest to this frame
        // instead using modulo
        // if the modulo value is zero or one, using the current 16th note, if it is 2 or 3, using the one higher
        // let index = Math.round(map(window.clock.currentFrame.count, 0, Constants.numFramesInSong - 1,
        //                     0, Constants.maxNumHitsPerTrack - 1))
        // let index = window.clock.sixteenthNoteIndex.count
        // // move to the higher 16th note index if the frame count is closer to that higher one
        // // if (window.clock.currentFrame.count % Constants.framesPerHit > 1) index++
        // console.log("**HIT** quarter note: " + window.clock.quarterNoteIndex.count + 
        //             " sixteenthNote: " + window.clock.sixteenthNoteIndex.count +
        //             " slot index: " + index);
        const frame = window.clock.currentFrame.count
        const newHit = new Hit(name, frame)
        const indexInFrame = window.song.hits[frame].length
        window.song.hits[frame].push(newHit)
        window.song.undoStack.unshift(frame)
        this.newHits.push(newHit)
    }

    setAllHitsToPlayable() {
        for (const hit of this.newHits) {
            hit.playable = true
        }
        this.newHits = []
    }

}