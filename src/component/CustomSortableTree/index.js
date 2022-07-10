import React, { useState, useEffect } from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import CustomNodeContentRenderer from "./CustomNodeContentRenderer";
import _ from "lodash";
const CustomSortableTree = ({
  rowHeight = 48,
  offset = 30,
  innerStyle = {},
  maxDepth = 2,
  toolBarMarginRight = 20,
}) => {
  const [data, setData] = useState([
    {
      title: "Chicken",
      expanded: true,
      children: [{ title: "Egg" }, { title: "Egg1" }],
    },
    // { title: "Fish", children: [{ title: "fingerline" }] },
    // { title: "Fish1", children: [{ title: "fingerline1" }] },
    // { title: "Fish2", children: [{ title: "fingerline2" }] },
  ]);
  //=======================STATES===========================

  return (
    <div style={{ height: 400, overflow: "hidden" }}>
      <SortableTree
        isVirtualized={false}
        treeData={data}
        maxDepth={maxDepth}
        onChange={(treeData) => {
          setData(treeData);
        }}
        scaffoldBlockPxWidth={offset}
        style={{ ...innerStyle, left: `-${offset}px`, position: "relative" }}
        nodeContentRenderer={CustomNodeContentRenderer}
        generateNodeProps={(rowInfo) => {
          let style = {};
          if (rowInfo.parentNode) {
            if (rowInfo.node.expanded && rowInfo.node.children.length > 0) {
              style = {
                borderTop: "none",
                borderRight: "none",
              };
            } else {
              // borderTop None for the first one only
              if (_.isEqual(rowInfo.parentNode.children[0], rowInfo.node)) {
                style = {
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                };
              } else {
                style = {
                  borderRight: "none",
                  borderBottom: "none",
                };
              }
            }
          } else {
            if (rowInfo.node.expanded) {
              style = {
                borderLeft: "none",
                borderRight: "none",
              };
            } else {
              style = {
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "none",
              };
            }
          }
          const offSet = (rowInfo.path.length-1)* offset 
          return {
            style: { ...style },
            buttons: [
              <div className="rst__custom__rowToolbar" style={{right:`${offSet}px`,marginRight:`${toolBarMarginRight}px`}}>
                <div
                  className="detail-menu__menu--list--item--btn--edit text-title-3"
                  onClick={() => {
                    console.log("edit");
                  }}
                >
                  Edit
                </div>
                
                <div
                  className="detail-menu__menu--list--item--btn--delete text-title-3"
                  onClick={() => {
                    console.log("delete")
                  }}
                >
                  Delete
                </div>
                
              </div>,
            ],
          };
        }}
        rowHeight={rowHeight}
      />
    </div>
  );
};

export default CustomSortableTree;
