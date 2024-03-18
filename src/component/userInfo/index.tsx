import { EmailIcon, CalendarIcon, PhoneIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import React, { FC } from "react";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";

export const UserInfo: FC <{userData: UserInfo}> = ({userData}) =>{
    const userDetails = [
      {
      
      icon: <FaUser />,
      tooltipLabel: userData?.gender
      },
      {
      icon:<EmailIcon/>,
      tooltipLabel: userData?.email
      },
      {
      icon: <CalendarIcon/>,
      tooltipLabel: userData?.dob?.age
      },
      {
      icon: <FaMapMarkerAlt/>,
      tooltipLabel: userData?.location?.country,
      },
      {
      icon: <PhoneIcon/>,
      tooltipLabel: userData?.phone,
      },
    
  ]


      return(
        <>
        {userDetails.map((value, key)=>(
        
          <Tooltip label={value?.tooltipLabel} key={key}> 
      <IconButton variant="outline" aria-label="Search database" color="white" icon={value?.icon} mr={'8px'} />
      </Tooltip>))}
        </>
      )
    }