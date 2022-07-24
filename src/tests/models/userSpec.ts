import { userStore, User } from "../../models/users";

describe('Test user model', () => {
    const user_store: userStore = new userStore();
    const user: User = {id:1, firstName: "Neveen", lastName: "Samir", password: "123456"};

    it('Test index method', async () => {
        const result = await user_store.index();
        expect(result).toBeTruthy();
    });

    it('Test show by id method V1', async () => {
        const result = await user_store.show(0);
        expect(result).toBeUndefined();
    });

    it('Test create method', async () => {
        const result = await user_store.create(user);
        expect(result).toBeInstanceOf(Object);
    });
});