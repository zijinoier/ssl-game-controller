<template>
    <div>
        <a class="btn-edit" v-on:click="edit()">
            <font-awesome-icon icon="toggle-on" v-if="canPlaceBall"/>
            <font-awesome-icon icon="toggle-off" v-if="!canPlaceBall"/>
        </a>
    </div>
</template>

<script>
    export default {
        name: "TeamBallPlacement",
        props: {
            teamColor: String,
            editMode: Object,
        },
        methods: {
            edit: function () {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'canPlaceBall': !this.canPlaceBall
                    }
                })
            }
        },
        computed: {
            teamState: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            canPlaceBall() {
                return this.teamState.canPlaceBall;
            }
        }
    }
</script>

<style scoped>
    .btn-edit {
        margin-left: 0.3em;
        margin-right: 0.3em;
    }
</style>
