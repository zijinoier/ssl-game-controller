<template>
    <EditableLabelSelect
            :edit-mode="editMode"
            :value="team.name"
            :options="teams"
            :callback="updateTeamName"
    />
</template>

<script>
    import EditableLabelSelect from "../../common/EditableLabelSelect";

    export const TEAMS = [
        "",
        "AIS",
        "AMC",
        "CMμs",
        "ER-Force",
        "Immortals",
        "KIKS",
        "MCT Susano Logics",
        "MRL",
        "NEUIslanders",
        "OMID",
        "Parsian",
        "RoboDragons",
        "RoboFEI",
        "RoboIME",
        "RoboJackets",
        "RoboTeam Twente",
        "SRC",
        "SSH",
        "STOx’s",
        "Test Team",
        "TIGERs Mannheim",
        "ULtron",
        "UMass Minutebots",
        "UBC Thunderbots",
        "ZJUNlict"];

    export default {
        name: "TeamName",
        components: {EditableLabelSelect},
        props: {
            teamColor: String,
            editMode: Object,
        },
        computed: {
            team: function () {
                return this.$store.state.refBoxState.teamState[this.teamColor]
            },
            teams: function () {
                return TEAMS
            }
        },
        methods: {
            updateTeamName: function (v) {
                this.$socket.sendObj({
                    'modify': {
                        'forTeam': this.teamColor,
                        'teamName': v
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
