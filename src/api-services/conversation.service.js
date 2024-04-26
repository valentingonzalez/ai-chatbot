import config from "@/api-services/_config";

export default {
    deleteRoomConversation(roomId) {
        return fetch(`${config.url}/conversation:index/delete-room-conversation`, { method: "POST", body: config.makeFormData({ room_id: roomId }), }).then((res) => res.json());
    }
};