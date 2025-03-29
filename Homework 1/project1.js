// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{
        const bgData = bgImg.data;  //prendo array di pixel (RGBA)
        const fgData = fgImg.data;
    
        for (let y = 0; y < fgImg.height; y++) { //scorro i pixel del foreground image
            const bgY = y + fgPos.y;    //traduco la pos del pixel del fgImg in quella corrispondente del bgImg
            if (bgY < 0 || bgY >= bgImg.height) continue;  //salto i pizel fuori dai bordi di bgImg
    
    
            for (let x = 0; x < fgImg.width; x++) {
                const bgX = x + fgPos.x;
                if (bgX < 0 || bgX >= bgImg.width) continue;
    
                const fgIndex = (y * fgImg.width + x) * 4;
                const bgIndex = (bgY * bgImg.width + bgX) * 4;
    
                const fgAlpha = (fgData[fgIndex + 3] / 255) * fgOpac; //valore di trasparenza effettivo del pixel del fgImg
                const invAlpha = 1 - fgAlpha;  //calcolo la parte di bgImg che resta visibile
    
                for (let i = 0; i < 3; i++) {   //applico la formula del blending per RGB
                    bgData[bgIndex + i] = 
                        fgData[fgIndex + i] * fgAlpha + 
                        bgData[bgIndex + i] * invAlpha;
                }
            }
        }
}

