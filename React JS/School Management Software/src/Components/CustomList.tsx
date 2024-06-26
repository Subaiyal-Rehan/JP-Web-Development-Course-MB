import React, { useState } from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FaAngleRight, FaAngleDown, FaInfo, FaEnvelope, FaTools, FaUsers, FaAddressBook } from 'react-icons/fa';
import { PiStudentBold } from "react-icons/pi";
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming you have CSS for custom styling

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
    name: 'About',
    icon: <FaInfo />,
    children: [
      {
        id: '3',
        name: 'Team',
        link: '/about/team',
        icon: <FaAngleRight />,
      },
      {
        id: '4',
        name: 'Contact',
        link: '/about/contact',
        icon: <FaAngleRight />,
      },
    ],
  },
  {
    id: '5',
    name: 'Services',
    icon: <FaTools />,
    children: [
      {
        id: '6',
        name: 'Consulting',
        link: '/services/consulting',
        icon: <FaAngleRight />,
      },
      {
        id: '7',
        name: 'Development',
        link: '/services/development',
        icon: <FaAngleRight />,
      },
    ],
  },
];

const TreeNode: React.FC<{ node: TreeNode; nested?: boolean }> = ({ node, nested }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <>
      <ListItem disablePadding>
        <Link
          className='text-white text-decoration-none w-100'
          to={node.link || "#"}
          onClick={node.children ? handleToggle : undefined}
        >
          <ListItemButton
            className={nested ? 'py-2 nested-item' : 'ps-4 py-3 main-item'}
          >
            {node.icon && (
              <ListItemIcon className={nested ? "text-secondary" : "text-orange fs-4"} style={nested ? { minWidth: '20px' } : {}}>
                {node.icon}
              </ListItemIcon>
            )}
            <ListItemText className='text-gray' primary={node.name} />
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
              <TreeNode key={childNode.id} node={childNode} nested={true} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const CustomList: React.FC = () => {
  return (
    <List className='m-0 p-0'>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} nested={false} />
      ))}
    </List>
  );
};

export default CustomList;
