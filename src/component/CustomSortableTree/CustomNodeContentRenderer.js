import React, { Component } from "react";
import PropTypes from "prop-types";
import { isDescendant } from "./utils/tree-data-utils";
import classnames from "./utils/classnames";
import "./node-renderer-default.css";
class NodeRendererDefault extends Component {
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      subtitle,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      buttons,
      className,
      style,
      didDrop,
      treeId,
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      rowDirection,
      ...otherProps
    } = this.props;
    const nodeTitle = title || node.title;
    const nodeSubtitle = subtitle || node.subtitle;
    const rowDirectionClass = rowDirection === "rtl" ? "rst__rtl" : null;

    let handle;
    if (canDrag) {
      if (typeof node.children === "function" && node.expanded) {
        // Show a loading symbol on the handle when the children are expanded
        //  and yet still defined by a function (a callback to fetch the children)
        handle = (
          <div className="rst__loadingHandle">
            <div className="rst__loadingCircle">
              {[...new Array(12)].map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={classnames(
                    "rst__loadingCirclePoint",
                    rowDirectionClass
                  )}
                />
              ))}
            </div>
          </div>
        );
      } else {
        // Show the handle used to initiate a drag-and-drop
        handle = connectDragSource(
          <div className="rst__moveHandle">
            <svg
              viewBox="0 0 20 20"
              
              className="Polaris-Icon__Svg_375hu"
              focusable="false"
              aria-hidden="true"
              style={{fill:'rgb(92, 95, 98)',width:'20px',height:'20px'}}
            >
              <path d="M7 2a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm6-8a2 2 0 1 0-.001-4.001 2 2 0 0 0 .001 4.001zm0 2a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001zm0 6a2 2 0 1 0 .001 4.001 2 2 0 0 0-.001-4.001z"></path>
            </svg>
          </div>,
          {
            dropEffect: "copy",
          }
        );
      }
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    let buttonStyle = { left: -0.5 * scaffoldBlockPxWidth };
    if (rowDirection === "rtl") {
      buttonStyle = { right: -0.5 * scaffoldBlockPxWidth };
    }

    return (
      <div style={{ height: "100%" }} {...otherProps}>
        {/* {toggleChildrenVisibility &&
          node.children &&
          (node.children.length > 0 || typeof node.children === "function") && (
            <div>
              <button
                type="button"
                aria-label={node.expanded ? "Collapse" : "Expand"}
                className={classnames(
                  node.expanded ? "rst__collapseButton" : "rst__expandButton",
                  rowDirectionClass
                )}
                style={buttonStyle}
                onClick={() =>
                  toggleChildrenVisibility({
                    node,
                    path,
                    treeIndex,
                  })
                }
              />

              {node.expanded && !isDragging && (
                <div
                  style={{ width: scaffoldBlockPxWidth }}
                  className={classnames("rst__lineChildren", rowDirectionClass)}
                />
              )}
            </div>
          )} */}

        <div className={classnames("rst__rowWrapper", rowDirectionClass)}>
          {/* Set the row preview to be used during drag and drop */}
          {connectDragPreview(
            <div
              className={classnames(
                "rst__row",
                isLandingPadActive && "rst__rowLandingPad",
                isLandingPadActive && !canDrop && "rst__rowCancelPad",
                isSearchMatch && "rst__rowSearchMatch",
                isSearchFocus && "rst__rowSearchFocus",
                rowDirectionClass,
                className
              )}
              style={{
                opacity: isDraggedDescendant ? 0.5 : 1,
                ...style,
              }}
            >
              {handle}

              <div
                className={classnames(
                  "rst__rowContents",
                  !canDrag && "rst__rowContentsDragDisabled",
                  rowDirectionClass
                )}
              >
                <div className={classnames("rst__rowLabel", rowDirectionClass)}>
                  {/* Custom [Start]*/}
                  {toggleChildrenVisibility &&
                    node.children &&
                    (node.children.length > 0 ||
                      typeof node.children === "function") && (
                      <span
                        style={{
                          display: "inline-block",
                        }}
                        className={classnames(
                          "rst__cust_btn",
                          node.expanded
                            ? "rst__cust_collapseButton"
                            : "rst__cust_expandButton"
                        )}
                      >
                        <button
                          type="button"
                          style={{
                            border: "none",
                            background: "transparent",
                          }}
                          onClick={() =>
                            toggleChildrenVisibility({
                              node,
                              path,
                              treeIndex,
                            })
                          }
                        >
                          <i
                            className="fa fa-arrow-down"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </span>
                    )}
                  {/* Custom [End]*/}

                  <span
                    className={classnames(
                      "rst__rowTitle",
                      node.subtitle && "rst__rowTitleWithSubtitle"
                    )}
                  >
                    {typeof nodeTitle === "function"
                      ? nodeTitle({
                          node,
                          path,
                          treeIndex,
                        })
                      : nodeTitle}
                  </span>

                  {nodeSubtitle && (
                    <span className="rst__rowSubtitle">
                      {typeof nodeSubtitle === "function"
                        ? nodeSubtitle({
                            node,
                            path,
                            treeIndex,
                          })
                        : nodeSubtitle}
                    </span>
                  )}
                </div>

                <div className="rst__rowToolbar">
                  {buttons.map((btn, index) => (
                    <div
                      key={index} // eslint-disable-line react/no-array-index-key
                      className="rst__toolbarButton"
                    >
                      {btn}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

NodeRendererDefault.defaultProps = {
  isSearchMatch: false,
  isSearchFocus: false,
  canDrag: false,
  toggleChildrenVisibility: null,
  buttons: [],
  className: "",
  style: {},
  parentNode: null,
  draggedNode: null,
  canDrop: false,
  title: null,
  subtitle: null,
  rowDirection: "ltr",
};

NodeRendererDefault.propTypes = {
  node: PropTypes.shape({}).isRequired,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,
  isSearchMatch: PropTypes.bool,
  isSearchFocus: PropTypes.bool,
  canDrag: PropTypes.bool,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  toggleChildrenVisibility: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  style: PropTypes.shape({}),

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  isDragging: PropTypes.bool.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  // Drop target
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,

  // rtl support
  rowDirection: PropTypes.string,
};

export default NodeRendererDefault;
