import React, { useState, useEffect } from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FaAngleRight, FaAngleDown, FaChalkboardTeacher  } from 'react-icons/fa';
import { RxDotFilled } from "react-icons/rx";
import { PiStudentBold, PiBooks } from "react-icons/pi";
// import { SiGoogleclassroom } from "react-icons/si";
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
        icon: <RxDotFilled />,
      },
      {
        id: 'admissionForm',
        name: 'Admission Form',
        link: '/students/admissionForm',
        icon: <RxDotFilled />,
      },
      {
        id: 'studentPromotion',
        name: 'Student Promotion',
        link: '/students/studentPromotion',
        icon: <RxDotFilled />,
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
        icon: <RxDotFilled />,
      },
      {
        id: '4',
        name: 'Add Teachers',
        link: '/teachers/addTeachers',
        icon: <RxDotFilled />,
      },
      {
        id: '5',
        name: 'Teacher Allocation',
        link: '/teachers/teacherAllocation',
        icon: <RxDotFilled />,
      },
    ],
  },
  {
    id: '6',
    name: 'Subjects',
    icon: <PiBooks />,
    children: [
      {
        id: '7',
        name: 'All Subjects',
        link: '/subjects/allSubjects',
        icon: <RxDotFilled />,
      },
      {
        id: '8',
        name: 'Add Subjects',
        link: '/subjects/addSubjects',
        icon: <RxDotFilled />,
      },
    ],
  },
  // {
  //   id: '9',
  //   name: 'Classes',
  //   icon: <SiGoogleclassroom />,
  //   children: [
  //     {
  //       id: '7',
  //       name: 'All Classes',
  //       link: '/classes/allClasses',
  //       icon: <RxDotFilled />,
  //     },
  //     {
  //       id: '8',
  //       name: 'Add Class',
  //       link: '/classes/addClass',
  //       icon: <RxDotFilled />,
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