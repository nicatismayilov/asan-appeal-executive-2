interface IBaseUser {
	firstName: string;
	lastName: string;
	fatherName: string;
}

function getFullName<T extends IBaseUser>(user: T): string {
	return `${user.firstName} ${user.lastName}, ${user.fatherName}`;
}

export default getFullName;
