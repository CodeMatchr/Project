package com.project.codematchr.service.implement;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.project.codematchr.service.FileService;

@Service
public class FileServiceImplement implements FileService {

    @Value("${file.path}") private String filePath;
    @Value("${file.url}") private String fileUrl;

    private final ResourceLoader resourceLoader;

    @Autowired
    public FileServiceImplement(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public String upload(MultipartFile file) {

        if(file.isEmpty()) return null;

        String originalFileName = file.getOriginalFilename();

        String extenstion = originalFileName.substring(originalFileName.lastIndexOf("."));

        String uuid = UUID.randomUUID().toString();

        String saveFileName = uuid + extenstion;

        String savePath = filePath + saveFileName;

        try {
            file.transferTo(new File(savePath));    
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        String url = fileUrl + saveFileName;
        return url;
    }

    @Override
    public Resource getFile(String fileName) {

        Resource resource = null;

        try {
            resource = new UrlResource("file:" + filePath + fileName);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return resource;

    }

    @Override
    public Resource getTextFile(String fileName) {

        try {
    
            String fileLocation = fileUrl.equalsIgnoreCase("true") ? filePath : "file:" + filePath + fileName;

            Resource resource = new UrlResource(fileLocation);

            if (!resource.exists()) {
                throw new IOException("file:" + filePath + fileName);
            }

            return resource;
            
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

    }
    
}
