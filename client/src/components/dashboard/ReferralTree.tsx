import ReferralNode from "./ReferralNode";

const ReferralTree = ({
  tree,
}: any) => {

  if (!tree) {
    return (
      <p>
        No referrals
        found
      </p>
    );
  }

  return (
    <ReferralNode
      node={tree}
    />
  );
};

export default ReferralTree;