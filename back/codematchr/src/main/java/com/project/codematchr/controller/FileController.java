package com.project.codematchr.controller;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.project.codematchr.service.FileService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/file")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) {
        String url = fileService.upload(file);
        return url;
    }

    @GetMapping(value="/{fileName}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Resource getFile(@PathVariable(value="fileName", required=true) String fileName) {
        Resource resource = fileService.getFile(fileName);
        return resource;
    }
    
    @GetMapping(value="/code/{fileName}", produces = {MediaType.TEXT_PLAIN_VALUE})
    public Resource getTextFile(@PathVariable(value = "fileName", required = true) String fileName) {
        Resource resource = fileService.getFile(fileName);
        return resource;
    }
    
}
