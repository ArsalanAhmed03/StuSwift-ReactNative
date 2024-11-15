import {useState} from 'react';
import {Text,View,StyleSheet,ScrollView,Image,TouchableOpacity,TextInput,FlatList,Modal} from 'react-native';
import App from './(tabs)/index';
import { Ionicons } from '@expo/vector-icons';
import {FIREBASE_AUTH,FIRESTORE_DB} from '../FireBaseConfig';
import {collection,getDocs,addDoc} from 'firebase/firestore';
export default function creategroup(){
    const[group_name,setgroupname]=useState('');
    const[group_description,setdescription]=useState('');
    const[ID,setID]=useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const[usernames,setusernames]=useState([]);
    const fetchusers=async()=>{
    const names=collection(FIRESTORE_DB,"Users");
    const snapshot=await getDocs(names);
    const allusers=snapshot.docs.map(doc=>doc.data().username);
    setusernames(allusers);
    }
    fetchusers();
    function handleSelectID(selectedID) {
        if (ID.includes(selectedID)) {
            setID(prevID => prevID.filter(id => id !== selectedID));
        } else {
            setID(prevID => [...prevID, selectedID]);
        }
    }
    function handle_creategroup(){
        if(!group_name || !group_description || !ID){
            alert('Fill all the Feilds');
            return;
        }
        // const idPattern = /^[0-9]+(,[0-9]+)*$/;
        // if(!idPattern.test(ID)){
        //     alert('The ID pattern is voilated');
        //     return
        // }
        // const emailList = ID.split(',').map(email => email.trim());

        // // Email validation pattern
        // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // for (const email of emailList) {
        //     if (!emailPattern.test(email)) 
        //     {
        //         alert(`Please enter a valid email address: ${email}`);
        //         return;
        //     }
        // }
        const GroupCollection=collection(FIRESTORE_DB,"Groups");
        addDoc(GroupCollection,{
            GroupName:group_name,
            GroupDescription:group_description,
            GroupMembers:ID,
            created_at:new Date(),
        })
        .then(() => { 
            alert("Group Created Successfully!");
          })
    }
    return(
        <View style={creategroupstyles.maincontainer}>
            <>
        <View style={creategroupstyles.HeadingContainer}>
        <View style={creategroupstyles.ArrowContainer}>
            {/* <TouchableOpacity onPress={()=>navigation.navigate('Chats Page')}> */}
            <Ionicons name="arrow-back-sharp" size={30} color="black" cursor="pointer"/>
        </View>
            <Text style={creategroupstyles.Heading}>Connect People</Text>
        </View>
        <View style={creategroupstyles.bodyContainer}>
            <TextInput style={creategroupstyles.bodyText} value={group_name} onChangeText={setgroupname}  placeholder='Group Name'></TextInput>
        </View>
        <View style={creategroupstyles.bodyContainer}>
            <TextInput style={creategroupstyles.bodyText} value={group_description} onChangeText={setdescription}  placeholder='Description'></TextInput>
        </View>
        <View style={creategroupstyles.bodyContainer}>
            <TextInput style={creategroupstyles.bodyText} value={ID.join(', ')} onChangeText={setID}  placeholder="Select Usernames"></TextInput>
                <TouchableOpacity style={creategroupstyles.select_plusPress} onPress={()=>setShowDropdown(true)}>
                    <Ionicons name="add-outline" size={25} color="white" />
                </TouchableOpacity>
        </View>
        <Modal visible={showDropdown} transparent={true} animationType="fade">
           <View style={creategroupstyles.modalContainer}>
             <View style={creategroupstyles.dropdownContainer}>
               <FlatList
              data={usernames}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={creategroupstyles.dropdownItem} onPress={() => handleSelectID(item)}>
                  <Text style={creategroupstyles.dropdownText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={creategroupstyles.closeButton} onPress={() => setShowDropdown(false)}>
              <Text style={creategroupstyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


        <View style={creategroupstyles.buttoncontainer}>
        <TouchableOpacity style={creategroupstyles.creategroupbutton} onPress={handle_creategroup}>
            <Text style={creategroupstyles.creategrouptext} >Create a Group</Text>
        </TouchableOpacity>
        </View>
        </>
        </View>
    );
}
const creategroupstyles=StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor:'white'
    },
       HeadingContainer:{
        flexDirection: 'row',
        justifyContent: 'center', 
    },
    Heading:{
        fontSize:30,
        fontWeight:'bold',
    },
    ArrowContainer:{
        position:'absolute',
        top:10,
        left:8
    },
    GroupiconContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:40
    },
    Groupiconimg:{
        height:60,
        width:60,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    bodyContainer:{
        marginHorizontal: 10, 
        marginTop: 60,
    },
    bodyText:{
        color: 'black',
        fontSize: 15,
        borderBottomColor: '#3B3B98',
        borderTopColor:'white',
        borderLeftColor:'white',
        borderRightColor:'white',
        borderBottomWidth:2,
        borderRadius: 5,
        padding: 5,
    },
    buttoncontainer:{
        flexDirection: 'row',
        justifyContent: 'center', 
        marginTop: 20,
    },
    creategroupbutton:{
        backgroundColor:'#3B3B98',
        height:50,
        width:160,
        borderRadius:15,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    creategrouptext:{
        color:'white',
        textAlign: 'center',
       
    },
    select_plusPress:{
        position: 'absolute',
        right: 10, 
        top: '50%',
        marginTop: -15, 
        backgroundColor: '#3B3B98',
        borderRadius:20,
    },
    Modalstyles: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          dropdownContainer: {
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
          },
          dropdownItem: {
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          },
          dropdownText: {
            fontSize: 18,
          },
          closeButton: {
            marginTop: 20,
            backgroundColor: '#3B3B98',
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
          },
          closeButtonText: {
            color: 'white',
            fontSize: 16,
          },
    });

