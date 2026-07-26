class RealtimeService {

    static io = null;

    static initialize(io) {
        this.io = io;
    }

    static broadcast(event, payload) {

        if (!this.io) {
            return;
        }

        this.io.emit(event, payload);
    }

}

module.exports = RealtimeService;