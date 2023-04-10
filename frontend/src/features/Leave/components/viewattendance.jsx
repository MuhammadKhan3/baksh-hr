import { Box } from "@mui/material";
import Header from "../../../components/header/header";
import Sidebar from "../../../components/sidebar/sidebar";

const useStyles=makeStyles({
    mainContainer:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
  
    },
    sidebar:{
      width:'25%'
    },
    employee:{
      display:'flex',
      flexDirection:'row',
      padding:'2rem',
      width:'100%'
    },
    // #E1E1E1
    sideBorder:{
      borderRight: '1px solid #E1E1E1;',
      width:'0px',
      height:'auto',
      margin:'0 5vw',
    },
    formikDiv:{
      // display:'flex',
      // flexDirection:'row',
      width:'100%'
    },
    column:{
      display:'flex',
      flexDirection:'column',
    },
    rightContainer:{
      width:'70%'
    }
  
  })
  
  
  const ViewAttendance = () => {
      const classes=useStyles();
      const [attendance,setattendance]=useState([])
      const [cookies] = useCookies(['token']);
      const [employee,setemployee]=useState([]);
      const params= useParams();
  
      useEffect(()=>{
  
          const fetchAttendance=async()=>{
              const {token}=cookies;
              const {employeeId}=params;
              console.log(token,employeeId)
              const response=await axios.get(publicApi+`/get-attendance/${employeeId}`,{
                  headers: {
                      authorization: `Bearer ${token}`,
                  },
              })
              setattendance(response?.data?.employee)
          }
          fetchAttendance();
      },[])
  
  
    return (
      <Box component='div' className={classes.mainContainer}>
          <Box component='div' className={classes.sidebar}>
              <Sidebar/>
          </Box>
          <Box component='div' className={classes.rightContainer}>
             <Header heading={"View Employee"}/>
             <ViewCard employee={employee}/>
             <ViewDetailList/>
          </Box>
      </Box>
    )
  }
  
  export default ViewAttendance