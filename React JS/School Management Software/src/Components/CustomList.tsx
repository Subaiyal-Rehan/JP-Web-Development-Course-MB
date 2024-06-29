import React, { useState, useEffect } from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FaAngleRight, FaAngleDown, FaChalkboardTeacher  } from 'react-icons/fa';
import { PiStudentBold } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

interface TreeNode {
  id: string;
  name: string;
  link?: string;
  children?: TreeNode[];
  icon?: React.ReactNode;
}

const data: TreeNode[] = [
  {
    id: '1',
    name: 'Students',
    icon: <PiStudentBold />,
    children: [
      {
        id: 'addStudent',
        name: 'All Students',
        link: '/students/allStudents',
        icon: <FaAngleRight />,
      },
      {
        id: 'admissionForm',
        name: 'Admission Form',
        link: '/students/admissionForm',
        icon: <FaAngleRight />,
      },
      {
        id: 'studentPromotion',
        name: 'Student Promotion',
        link: '/students/studentPromotion',
        icon: <FaAngleRight />,
      },
    ],
  },
  {
    id: '2',
    name: 'Teachers',
    icon: <FaChalkboardTeacher  />,
    children: [
      {
        id: '3',
        name: 'All Teachers',
        link: '/teachers/allTeachers',
        icon: <FaAngleRight />,
      },
      {
        id: '4',
        name: 'Add Teachers',
        link: '/teachers/addTeachers',
        icon: <FaAngleRight />,
      },
    ],
  },
  // {
  //   id: '5',
  //   name: 'Services',
  //   icon: <FaTools />,
  //   children: [
  //     {
  //       id: '6',
  //       name: 'Consulting',
  //       link: '/services/consulting',
  //       icon: <FaAngleRight />,
  //     },
  //     {
  //       id: '7',
  //       name: 'Development',
  //       link: '/services/development',
  //       icon: <FaAngleRight />,
  //     },
  //   ],
  // },
];

const TreeNode: React.FC<{ node: TreeNode; nested?: boolean; onTabClick: (id: string) => void; activeTab: string | null }> = ({ node, nested, onTabClick, activeTab }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => setOpen(!open);

  useEffect(() => {
    const isActive = node.children?.some(child => child.link === location.pathname) || node.link === location.pathname;
    if (isActive) setOpen(true);
    else setOpen(false);
  }, [location.pathname, node]);

  const handleClick = (id: string) => {
    if (node.children) {
      handleToggle();
    } else {
      onTabClick(id);
    }
  };

  useEffect(() => {
    const isActive = node.children?.some(child => child.link === location.pathname) || node.link === location.pathname;
    if (isActive) {
      onTabClick(node.id);
    }
  }, [location.pathname]);

  return (
    <>
      <ListItem disablePadding>
        <Link
          className='text-white text-decoration-none w-100'
          to={node.link || "#"}
          onClick={() => handleClick(node.id)}
        >
          <ListItemButton
           className={nested ? `py-2 ${activeTab === node.id ? "ps-5 active-nested" : "nested-item"}` : 'ps-4 py-3 main-item'}
            sx={{ backgroundColor: activeTab === node.id ? 'var(--orange)' : 'transparent' }} 
          >
            {node.icon && (
              <ListItemIcon className={nested ? "text-secondary" : "text-orange fs-4"} style={nested ? { minWidth: '20px' } : {}}>
                {node.icon}
              </ListItemIcon>
            )}
            <ListItemText className={activeTab === node.id ? "text-black" : "text-gray"} primary={node.name} />
            {node.children && (
              <ListItemIcon className='ml-auto text-orange'>
                {open ? <FaAngleDown /> : <FaAngleRight />}
              </ListItemIcon>
            )}
          </ListItemButton>
        </Link>
      </ListItem>
      {!nested && <hr className='text-white p-0 m-0' />}
      {node.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {node.children.map((childNode) => (
              <TreeNode key={childNode.id} node={childNode} nested={true} onTabClick={onTabClick} activeTab={activeTab} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const CustomList: React.FC<{ onTabClick: (id: string) => void; activeTab: string | null }> = ({ onTabClick, activeTab }) => {
  return (
    <List className='m-0 p-0'>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} nested={false} onTabClick={onTabClick} activeTab={activeTab} />
      ))}
    </List>
  );
};

export default CustomList;