import { getDbUsers, type Friend} from "../dal/db"

export async function getApiUsers() : Promise<Friend[]> {

    return await getDbUsers()
}