import { Dexie, type EntityTable } from 'dexie';

//#region Interfaces
interface Friend {
  id   : number;
  name : string;
  age  : number;
}

interface Adresse {
  id          : number;
  rue         : string;
  codePostale : number;
}
//#endregion

//#region Init
const db = new Dexie('FriendsDatabase') as Dexie & {
  friends: EntityTable<
    Friend,
    'id' // primary key "id" (for the typings only)
  >;

  adresses: EntityTable<
    Adresse,
    'id' // primary key "id" (for the typings only)
  >;  
};

// Schema declaration:
db.version(1).stores({
  friends : '++id, name, age', // primary key "id" (for the runtime!)
  adresses: '++id, rue, codePostale' // primary key "id" (for the runtime!)
});
//#endregion

//#region Functions
async function addDbFriend(name: string, age : number) : Promise<number> {
  const id = await db.friends.add(
    {
      name: name,
      age : age,
    }    
  )

  await db.adresses.add(
    {
      rue         : "un test",
      codePostale : 31000,
    }    
  )  
  
  return id;
}

async function getDbFriendByAge(ageMin : number, ageMax : number) {
  return await db.friends.where("age").between(ageMin, ageMax).toArray()
}

async function getDbUsers() : Promise<Friend[]> {
    return await db.friends.toArray()
}
//#endregion

export type { Friend, Adresse };
export { db, addDbFriend, getDbFriendByAge, getDbUsers };