interface IUserNode {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  referralCode: string;
  accountStatus: string;
  referredBy?: string | null;
  children?: IUserNode[];
}

export const buildReferralTree = (
  rootId: string,
  users: IUserNode[]
) => {
  const map =
    new Map<
      string,
      IUserNode
    >();

  users.forEach((user) => {
    user.children = [];
    map.set(
      String(user._id),
      user
    );
  });

  let root:
    | IUserNode
    | null = null;

  users.forEach((user) => {
    const userId =
      String(user._id);

    if (
      userId === rootId
    ) {
      root = user;
      return;
    }

    if (
      user.referredBy &&
      map.has(
        String(
          user.referredBy
        )
      )
    ) {
      map
        .get(
          String(
            user.referredBy
          )
        )!
        .children!.push(user);
    }
  });

  return root;
};