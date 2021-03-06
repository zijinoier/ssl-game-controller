import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export class TeamState {
    name = 'someone';
    goals = 0;
    goalkeeper = 0;
    yellowCards = 0;
    yellowCardTimes = [];
    redCards = 0;
    timeoutsLeft = 4;
    timeoutTimeLeft = 300;
    onPositiveHalf = true;
    foulCounter = 0;
    ballPlacementFailures = 0;
    canPlaceBall = true;
    maxAllowedBots = 0;
}

export class RefBoxState {
    stage = 'unknown';
    command = '';
    commandForTeam = '';
    gameEvents = [];
    stageTimeElapsed = 0;
    stageTimeLeft = 0;
    matchDuration = 0;
    teamState = {'Yellow': new TeamState(), 'Blue': new TeamState()};
    nextCommand = '';
    nextCommandFor = '';
    currentActionTimeRemaining = 0;
}

export class GcState {
    division = 'DivA';
    autoContinue = true;
    gameEventBehavior = {};
    gameEventProposals = [{proposerId: '', gameEvent: {type: '', details: {foo: 'bar'}}, validUntil: 0}];
    autoRefsConnected = [];
    teamConnected = {'Yellow': false, 'Blue': false};
    teamConnectionVerified = {'Yellow': false, 'Blue': false};
}

export class ProtocolEntry {
    id = 0;
    timestamp = 0;
    stageTime = 0;
    type = '';
    name = '';
    team = 'Yellow';
    description = '';
    previousState = null;
}

export default new Vuex.Store({
    state: {
        gcState: new GcState(),
        refBoxState: new RefBoxState(),
        protocol: []
    },
    mutations: {
        SOCKET_ONOPEN() {
        },
        SOCKET_ONCLOSE() {
        },
        SOCKET_ONERROR() {
        },
        SOCKET_ONMESSAGE(state, message) {
            if (message.protocol) {
                state.protocol = message.protocol;
            }
            if (message.gcState) {
                state.gcState = message.gcState;
                state.refBoxState = message.gcState.matchState;
            }
        },
        SOCKET_RECONNECT() {
        },
        SOCKET_RECONNECT_ERROR() {
        },
    }
});
