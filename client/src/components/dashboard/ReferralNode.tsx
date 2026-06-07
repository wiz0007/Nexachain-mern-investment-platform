import {
  useState,
} from "react";

interface NodeProps {
  node: any;
}

const ReferralNode = ({
  node,
}: NodeProps) => {

  const [
    expanded,
    setExpanded,
  ] = useState(true);

  return (
    <div>
      <div
        onClick={() =>
          setExpanded(
            !expanded
          )
        }
      >
        {node.fullName}
      </div>

      {expanded &&
        node.children?.map(
          (
            child: any
          ) => (
            <div
              key={
                child._id
              }
              style={{
                marginLeft:
                  "20px",
              }}
            >
              <ReferralNode
                node={
                  child
                }
              />
            </div>
          )
        )}
    </div>
  );
};

export default ReferralNode;