import { Modal, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import './Carta.css'
import { useSelector } from 'react-redux';
import { Rate } from 'antd';
import { useLocation } from 'react-router';
import {HiDocumentDownload} from 'react-icons/hi'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import user from './../../imagenes/user.webp'
import maduro from './../../imagenes/maduro.jpg'
import delcy from './../../imagenes/delcy.jpg'
import mippci from './../../imagenes/mippci.jpg'
import presidencia from './../../imagenes/presidencia.jpg'


export default function TablaTweets(){
  const datatweets = useSelector((state) => state.datosFiltrados);
  const location = useLocation();
  const currentUrl = location.pathname;
  const subUrl = currentUrl.startsWith('/dashboard/') ? currentUrl.substring('/dashboard/'.length) : '';
  const modeloSinEspacios = decodeURIComponent(subUrl.replace(/\+/g, " "));
  const [modalVisible, setModalVisible] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);

  const openModal = (comments) => {
    setCurrentComments(comments);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentComments([]);
  };
  const tweetsFiltrados = datatweets.filter(tweet => {
    const propiedadModelo = tweet[modeloSinEspacios];
    return Array.isArray(propiedadModelo) && propiedadModelo.length > 0;
  });

 // Objeto de mapeo para agrupar por la propiedad link
const linkMap = {};

// Iterar a través de los objetos en datatweets
for (const obj of datatweets) {
  const link = obj.link;
  if (!linkMap[link]) {
    linkMap[link] = [];
  }
  linkMap[link].push(obj);
}

// Crear un array de arrays basado en el mapeo
const groupedArrays = Object.values(linkMap);
let array = groupedArrays
.slice(0,10)
.sort((a, b) => b.length - a.length);
console.log("GRUPOS ARRAY",array);

  const decodeText = (text) => {
    try {
      return decodeURIComponent(text);
    } catch (error) {
      return text;
    }
  };




// Paso 1: Iterar sobre cada objeto en el array
datatweets.forEach(tweet => {
  // Paso 2: Sumar las propiedades "citas", "retweets", "likes", "comentarios" y "vistas"
  const { citas, retweets, likes, comentarios } = tweet;
  const totalInteracciones = citas + retweets + likes + comentarios;

  // Paso 3: Almacenar la suma en una nueva propiedad del objeto
  tweet.totalInteracciones = totalInteracciones;
});

// Paso 4: Ordenar el array de objetos en base a la propiedad "totalInteracciones" de forma descendente
const tweetsNuevo = datatweets.sort((a, b) => b.totalInteracciones - a.totalInteracciones);
const top10MasRetwitteados = tweetsNuevo.slice(0,10)
// Filtrar los objetos con Tipo === "Post"
const postsTop10 = top10MasRetwitteados.slice(0, 10).filter(tweet => tweet.Tipo === "Post");

 
  //  console.log("TWEETS",tweetsNuevo.slice(0,100));
  
const data = [
  {
    key: '1',
    Tweets: 'Some tweet',
  },
  // ...otros datos
];
const [showVideo, setShowVideo] = useState(true);

const handleVideoError = () => {
  setShowVideo(false);
};

useEffect(()=>{

},[showVideo])



const columns = [
  {
    title: 'Eventos',
    dataIndex: 'Tweets',
    width: '50%',
    render: (_, record) => (
      array.map((item,key)=> (

        <div key={key}>
         <div className='contendor-tweets'>
           {/* CONTENEDOR GENERAL */}
          
           <div className='user-twitter'>{item[0].fecha}</div>    
           <br></br>
           <div className='foto-texto-perfil'>
             {/* CONTENEDOR foto y texto vertical */}
            <div className='contenedor-perfil'>
                {/* CONTENEDOR FOTO PERFIL  */}
                <img
                 src={item[0].usuarioOriginal === 'NicolasMaduro'
                   ? maduro
                   : item[0].usuarioOriginal === 'MIPPCIVzla'
                   ? mippci
                   : item[0].usuarioOriginal === 'DespachoPresidencia'
                   ? presidencia
                   : item[0].usuarioOriginal === 'delcyrodriguezv'
                   ? delcy
                   : item[0].profileImage === "" ? user
                   : item[0].profileImage} 
                 className='fotoperfil'
                 alt='Foto de perfil'
               />
             </div>
             
             <div className='contenedor-publicacion'>
             <Link to={item[0].link} target="_blank">
               {/* CONTENEDOR TEXTO */}
               <div className='contenedor-tituloSubtitulo'>
                 {/* <div className='titulo-tweet'>{item[0].name}</div> */}
                 {/* Título */}
                 <div className='user-twitter'>{item[0].usuarioOriginal}</div>
                           
                  
                 </div>
                 {/* Mapeo de usuarios categorizadores */}
                 {/* {item[0].usuarioCategorizador_Comments.length > 0 && (
                   <div>
                     <div>Replying to</div>
                     <div className='replyingto'>
                       {item[0].usuarioCategorizador_Comments.map((usuario, index) => `${usuario}`).join(' ')}
                     </div>
                   </div>
                 )} */}
                <div>{decodeText(item[0].texto)}</div>
               {/* Texto */}
               {item[0].imagen_tweet !== "" && item[0].imagen_tweet.length > 0 ? (
                 <div>
                   {item[0].imagen_tweet.map((elemento, index) => {
                     if (elemento.startsWith('https://video')) {
                       return (
                         <video key={index} src={elemento} controls  className='publicacion'/>
               
                       );
                     } else {
                       return (
                         <img
                           key={index}
                           src={elemento}
                           className='publicacion'
                           alt='Imagen de la publicación'
                         />
                       );
                     }
                   })}
       
                 </div>
               ) : null}
               {/* Imagen */}
               
                  {/*TWEET CITADO*/}
             {item[0].name_author_tweet_citado ?
                       <div className='contendor-tweets citado'>
                          <div className='user-twitter'>{item[0].fecha_tweet_citado}</div>  
                           <div className='contenedor-publicacion'>
                             {/* CONTENEDOR TEXTO */}
                             <div className='contenedor-tituloSubtitulo'>
                               <div className='titulo-tweet'>{item[0].name_author_tweet_citado}</div>
                               {/* Título */}
                               <div className='user-twitter'>{item[0].usuarioOriginal_tweet_citado}</div>
                                         
                            
                               </div>
                               </div>
                         <div>{decodeText(item[0].texto_tweet_citado)}</div>
                        
                       </div>
                       : null}
                       
               <div className='tags'> 
                 {/* CONTENEDOR tags */}
                 <Tag
                   key={key}
                   style={{marginBottom:"0.5rem"}}
                   color={
                     item[0].sentimiento === 'neutro'
                       ? 'grey'
                       : item[0].sentimiento === 'positivo'
                       ? '#008300'
                       : '#ff2323'
                   }
                 >
                   {item[0].sentimiento.toUpperCase()}
                 </Tag>
                  {/* {item[0].tags.map((tag, index) => (
                   <Tag style={{marginBottom:"0.5rem"}} key={index} color='blue'>{tag}</Tag>
                 ))} */}
                    {modeloSinEspacios !== null ? null :
                 <div>
                 {item[0][modeloSinEspacios].map((tag, index) => (
                   <Tag style={{marginBottom:"0.5rem"}} key={index} color='blue'>{tag}</Tag>
                 ))}
                 </div>
               }
               </div>

               
               <Rate allowHalf disabled defaultValue={item[0].totalInteracciones / top10MasRetwitteados[0].totalInteracciones * 5}  character={<span style={{ fontSize: '18px' }}>★</span>} />
                {/* <div className='retweets'>{item[0].retweets} retweets</div>  */}

                </Link>   
                <div className='contenedor-comentarios'>
          
          {item.slice(1, 6).map((unReadObj, index) => (
            <div className='comentariofb ' key={index}> 
            <div className='contenedor-perfilfb'>
            {/* CONTENEDOR FOTO PERFIL  */}
            <img
             src={unReadObj.usuarioOriginal === 'NicolasMaduro'
               ? maduro
               :unReadObj.usuarioOriginal === 'MIPPCIVzla'
               ? mippci
               :unReadObj.usuarioOriginal === 'DespachoPresidencia'
               ? presidencia
               :unReadObj.usuarioOriginal === 'delcyrodriguezv'
               ? delcy
               :unReadObj.profileImage} 
             className='fotoperfil'
             alt='Foto de perfil'
           />
           </div>
           <div className='citado contenedor-publicacionfb comentario-facebook'>
           <div className='user-fb'>{unReadObj.usuarioOriginal}</div>
            <div>{unReadObj.texto}</div>
            <div className='tags'> 
                 {/* CONTENEDOR tags */}
                 <Tag
                   key={key}
                   style={{marginBottom:"0.2rem", fontSize:"10px"}}
                   color={
                    unReadObj.sentimiento === 'neutro'
                       ? 'grey'
                       : unReadObj.sentimiento === 'positivo'
                       ? '#008300'
                       : '#ff2323'
                   }
                 >
                   {unReadObj.sentimiento.toUpperCase()}
                 </Tag>
               </div>
           </div>
         </div>
          ))}
           {item.length > 6 && (
        <Button type='link' onClick={() => openModal(item.slice(1))}>
          Ver más comentarios
        </Button>
      )}

      </div>
             </div>
           </div>
         </div>
        </div>
        
     ))
    )
  }
];



const convertirArraysACadenas = (data) => {
  const newData = { ...data };
  for (const key in newData) {
    if (Array.isArray(newData[key])) {
      newData[key] = newData[key].join(', ');
    }
  }
  return newData;
};

const handleDownloadExcel = () => {
  const excelData = groupedArrays.flatMap((array) => {
    return array.map((obj) => {
      const newData = { ...obj };
      for (const key in newData) {
        if (Array.isArray(newData[key])) {
          newData[key] = newData[key].join(', ');
        }
      }
      return newData;
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  const fileName = `Eventos_${date}.xlsx`;

  saveAs(data, fileName);
};

  return(
    <div>
    <div className='titulo-carta'>Categorización</div>
   
    <div className='subtitulo-carta'>
        <div>Eventos con más engagements</div>
        <Tooltip title="Descargar Excel">
        <Button onClick={handleDownloadExcel} type="primary" shape="circle"  className='subtitulo-boton'><HiDocumentDownload/></Button>
        </Tooltip>
      </div>
    <div className='carta'>
      <Table columns={columns} dataSource={data} scroll={{ y: 348 }} pagination={false}/>
    </div>
     {/* Modal para mostrar los comentarios restantes */}
     <Modal
  visible={modalVisible}
  onCancel={closeModal}
  footer={null}
 
  bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }} // Ajusta el alto y el desplazamiento
>
      <div>
        {currentComments.map((unReadObj, index) => (
           <Link to={unReadObj.link} target="_blank">
           <div className='contenedor-comentarios'>
             <div className='comentariofb ' key={index}> 
             <div className='contenedor-perfilfb'>
             {/* CONTENEDOR FOTO PERFIL  */}
             <img
              src={unReadObj.usuarioOriginal === 'NicolasMaduro'
                ? maduro
                :unReadObj.usuarioOriginal === 'MIPPCIVzla'
                ? mippci
                :unReadObj.usuarioOriginal === 'DespachoPresidencia'
                ? presidencia
                :unReadObj.usuarioOriginal === 'delcyrodriguezv'
                ? delcy
                :unReadObj.profileImage} 
              className='fotoperfil'
              alt='Foto de perfil'
            />
            </div>
            <div className='citado contenedor-publicacionfb comentario-facebook'>
            <div className='user-fb'>{unReadObj.usuarioOriginal}</div>
             <div>{unReadObj.texto}</div>
             <div className='tags'> 
                  {/* CONTENEDOR tags */}
                  <Tag
                    key={index}
                    style={{marginBottom:"0.2rem", fontSize:"10px"}}
                    color={
                     unReadObj.sentimiento === 'neutro'
                        ? 'grey'
                        : unReadObj.sentimiento === 'positivo'
                        ? '#008300'
                        : '#ff2323'
                    }
                  >
                    {unReadObj.sentimiento.toUpperCase()}
                  </Tag>
                </div>
            </div>
          </div>
       </div>
       </Link>
        ))}
      </div>
      </Modal>
    </div>
  )
}
 




   


      // const columns = [
      //   {
      //     title: 'Eventos',
      //     dataIndex: 'Tweets',
      //     width: '50%',
      //     render: (_, record) => (
      //       <div>
      //         {groupedArrays.map((group, groupIndex) => (
      //           <Link to={group.link} target="_blank"> <div key={groupIndex}>
      //           <div className='contendor-tweets'>
      //             {/* CONTENEDOR GENERAL */}
      //             <div className='user-twitter'>{group.fecha}</div>    
      //             <br></br>
      //             <div className='foto-texto-perfil'>
      //               {/* CONTENEDOR foto y texto vertical */}
      //              <div className='contenedor-perfil'>
      //                  {/* CONTENEDOR FOTO PERFIL  */}
      //                  <img
      //                   src={group.usuarioOriginal === 'NicolasMaduro'
      //                     ? maduro
      //                     : group.usuarioOriginal === 'MIPPCIVzla'
      //                     ? mippci
      //                     : group.usuarioOriginal === 'DespachoPresidencia'
      //                     ? presidencia
      //                     : group.usuarioOriginal === 'delcyrodriguezv'
      //                     ? delcy
      //                     : group.profileImage} 
      //                   className='fotoperfil'
      //                   alt='Foto de perfil'
      //                 />
      //               </div>
                    
      //               <div className='contenedor-publicacion'>
      //                 {/* CONTENEDOR TEXTO */}
      //                 <div className='contenedor-tituloSubtitulo'>
      //                   {/* <div className='titulo-tweet'>{group.name}</div> */}
      //                   {/* Título */}
      //                   <div className='user-twitter'>{group.usuarioOriginal}</div>
                                  
                         
      //                   </div>
      //                   {/* Mapeo de usuarios categorizadores */}
      //                   {/* {group.usuarioCategorizador_Comments.length > 0 && (
      //                     <div>
      //                       <div>Replying to</div>
      //                       <div className='replyingto'>
      //                         {group.usuarioCategorizador_Comments.map((usuario, index) => `${usuario}`).join(' ')}
      //                       </div>
      //                     </div>
      //                   )} */}
      //                  <div>{decodeText(group.texto)}</div>
      //                 {/* Texto */}
      //                 {group.imagen_tweet !== "" && group.imagen_tweet.length > 0 ? (
      //                   <div>
      //                     {group.imagen_tweet.map((elemento, index) => {
      //                       if (elemento.startsWith('https://video')) {
      //                         return (
      //                           <video key={index} src={elemento} controls  className='publicacion'/>
                      
      //                         );
      //                       } else {
      //                         return (
      //                           <img
      //                             key={index}
      //                             src={elemento}
      //                             className='publicacion'
      //                             alt='Imagen de la publicación'
      //                           />
      //                         );
      //                       }
      //                     })}
              
      //                   </div>
      //                 ) : null}
      //                 {/* Imagen */}
      //                 <div className='tags'> 
      //                   {/* CONTENEDOR tags */}
      //                   <Tag
      //                     key={groupIndex}
      //                     style={{marginBottom:"0.5rem"}}
      //                     color={
      //                       group.sentimiento === 'neutro'
      //                         ? 'grey'
      //                         : group.sentimiento === 'positivo'
      //                         ? '#008300'
      //                         : '#ff2323'
      //                     }
      //                   >
      //                     {group.sentimiento.toUpperCase()}
      //                   </Tag>
      //                    {/* {group.tags.map((tag, index) => (
      //                     <Tag style={{marginBottom:"0.5rem"}} key={index} color='blue'>{tag}</Tag>
      //                   ))} */}
      //                      {modeloSinEspacios !== null ? null :
      //                   <div>
      //                   {group[modeloSinEspacios].map((tag, index) => (
      //                     <Tag style={{marginBottom:"0.5rem"}} key={index} color='blue'>{tag}</Tag>
      //                   ))}
      //                   </div>
      //                 }
                        
                      
      //                    {/*TWEET CITADO*/}
      //               {group.name_author_tweet_citado && group.usuarioOriginal_tweet_citado ?
      //                         <div className='contendor-tweets citado'>
      //                            <div className='user-twitter'>{group.fecha_tweet_citado}</div>  
      //                             <div className='contenedor-publicacion'>
      //                               {/* CONTENEDOR TEXTO */}
      //                               <div className='contenedor-tituloSubtitulo'>
      //                                 <div className='titulo-tweet'>{group.name_author_tweet_citado}</div>
      //                                 {/* Título */}
      //                                 <div className='user-twitter'>@{group.usuarioOriginal_tweet_citado}</div>
                                                
                                   
      //                                 </div>
      //                                 </div>
      //                           <div>{decodeText(group.texto_tweet_citado)}</div>
                               
      //                         </div>
      //                         : null}
                        
                       
                      
      
      //                 </div>
      //                 <Rate allowHalf disabled defaultValue={group.totalInteracciones / top10MasRetwitteados[0].totalInteracciones * 5}  character={<span style={{ fontSize: '18px' }}>★</span>} />
      //                  {/* <div className='retweets'>{group.retweets} retweets</div>  */}
      //               </div>
      //             </div>
      //           </div>
      //          </div></Link>
      //         ))}
      //       </div>
      //     )
      //   }
      // ];